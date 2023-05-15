import React, { useEffect, useState } from 'react'
import "../Styles/WriteBlog.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from "../Components/Header";
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';

const DeletePopUp = ({ setViewDeleteModal, handleDelete }) => {
  return (
    <>
      <div className="deleteContainer">
      </div>
      <div className="deleteWrapper">
          <div className="deleteContent">
            <span>Are you sure you want to delete this blog permanently ?</span>
            <div className="buttons">
              <button type='button' className='deleteBtn' onClick={handleDelete}>Delete</button>
              <button type='button' onClick={() => setViewDeleteModal(false)}>Cancel</button>
            </div>
          </div>
      </div>
    </>
  )
}

const WriteBlog = () => {
  const [editMode, setEditMode] = useState(false);
  const [blog, setBlog] = useState({});
  const location = useLocation();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState();
  const [viewModal, setViewModal] = useState(false);
  const [viewDeleteModal, setViewDeleteModal] = useState(false);
  const author = "644883cdc71a6b7534be5567";
  const navigate = useNavigate();

  useEffect(() => {
    const getBlog = async (blogId) => {
      try {
        const res = await fetch(`http://localhost:8082/blogapi/bloghandler/get-blog/${blogId}`);
        const blogData = await res.json();
        setBlog(blogData)
        setContent(blogData.blogStyledContent);
        setTitle(blogData.blogTitle);
        setTags(blogData.blogTags?.join(","));
      }
      catch (err) {
        console.log(err);
      }
    }
    if (location.pathname.includes('Edit-blog')) {
      setEditMode(true);
      let blogId = location.pathname.split("/")[2];
      getBlog(blogId);
    }
  }, [location])

  const handleChange = (value) => {
    setContent(value);
  }

  const handleReset = () => {
    setContent(''); setTitle(''); setTags([]);
  }

  const handleDelete = async() => {
    try{
      const res = await fetch(`http://localhost:8082/blogapi/bloghandler/delete-blog/${blog?._id}`,{
        method: "DELETE"
      });
      alert("Blog successfully deleted !!");
      navigate("/Blogs-home");
    } catch(err){
      console.log(err);
    }
  }

  const handleSubmit = async () => {
    if (editMode) {
      updateBlog();
    }
    else {
      createNewBlog();
    }
  }

  const createNewBlog = async () => {
    const plainText = document.querySelector('.ql-editor').innerText;
    const blogObject = {
      "author": author,
      "blogTitle": title,
      "blogTags": tags.split(","),
      "blogDescription": plainText,
      "blogDate": Date.now(),
      "blogStyledContent": content,
    }
    try {
      const res = await fetch("http://localhost:8082/blogapi/bloghandler/post-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: 'include',
        body: JSON.stringify(blogObject)
      });
      console.log(await res.json());
      navigate("/blogs-home");
    } catch (err) {
      console.log(err);
    }
  }

  const updateBlog = async () => {
    const plainText = document.querySelector('.ql-editor').innerText;
    const blogObject = {
      "author": blog.author,
      "blogTitle": title,
      "blogTags": tags.split(","),
      "blogDescription": plainText,
      "blogDate": blog.blogDate,
      "blogStyledContent": content,
    }
    try {
      const res = await fetch(`http://localhost:8082/blogapi/bloghandler/update-blog/${blog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: 'include',
        body: JSON.stringify(blogObject)
      });
      console.log(await res.json());
      alert("Blog updated successfully");
      navigate("/blogs-home");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {viewModal && <Modal setViewModal={setViewModal} />}
      {viewDeleteModal && <DeletePopUp setViewDeleteModal={setViewDeleteModal} handleDelete={handleDelete}/>}
      <Header />
      <div className='writeBlogContainer'>
        <div className="writeBlogWrapper">
          <div className='headingSection'>
            {
              editMode ? <h1>Edit your blog here</h1> :
                <h1>Write your own blog</h1>
            }
            <span onClick={() => setViewModal(true)}>AI help</span>
          </div>
          <div className='inputField'>
            <label htmlFor='blogTitle'>Title:</label>
            <input id="blogTitle" value={title} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='Enter your blog title' />
          </div>
          <div className='inputField'>
            <label htmlFor="blogTags">Tags:</label>
            <input id="blogTags" value={tags} onChange={(e) => setTags(e.target.value)} type="text" placeholder='Enter tags separated by a comma' />
          </div>
          <ReactQuill
            value={content}
            onChange={handleChange}
            placeholder='Start writing your blog here !!'
          />
          <div className="buttons">
            <button type='button' className='submitBtn' onClick={handleSubmit}>{editMode ? "Update" : "Submit"}</button>
            <button type='button' className='resetBtn' onClick={handleReset}>Reset</button>
            {
              editMode && <button type='button' className='deleteBtn' onClick={() => setViewDeleteModal(true)}>Delete</button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default WriteBlog
