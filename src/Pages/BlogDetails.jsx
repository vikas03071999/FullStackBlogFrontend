import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import "../Styles/BlogDetails.scss"
import { useLocation, useNavigate } from 'react-router-dom'
import BlogDetailsPoster from '../assets/Images/BlogDetailsPoster.jpg'
import UserContext from '../Contexts/UserContext'

const BlogDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const {user} = useContext(UserContext);
  const [isAuthor, setIsAuthor] = useState(true);
  const [author, setAuthor] = useState("");
  const blogId = location.search.split("=")[1];

  useEffect(()=>{
    const getBlog = async() => {
      const res = await fetch(`http://localhost:8082/blogapi/bloghandler/get-blog/${blogId}`);
      const blogTemp = await res.json();
      setBlog(blogTemp);
      getAuthor(blogTemp.author);
    }
    getBlog();
    const getAuthor = async(authorId) => {
      const res = await fetch(`http://localhost:8082/blogapi/user/get-user-details/${authorId}`);
      const authorTemp = await res.json();
      // console.log(authorTemp.username)
      setAuthor(authorTemp.username);
    }
  },[blogId])

  return (
    <>
      <Header />
      <div className='blogDetailsContainer'>
        <div className="blogDetailsWrapper">
          <img src={BlogDetailsPoster} />
          <div className='blogHeadingAndEdit'>
            <h1>{blog?.blogTitle}</h1>
            {
              isAuthor && <i className="fa-solid fa-pen editIcon" onClick={()=>navigate(`/Edit-blog/${blog?._id}`)}></i>
            }
          </div>
          <div className='realblog' dangerouslySetInnerHTML={{ __html: blog?.blogStyledContent }}>
          </div>
          <div className='aboutBlog'>
            <div className='author'><h3>Written by: </h3> <span>{author}</span></div>
            <div className="tagsSection">
            <i className="fa-solid fa-tag"></i>
            <div className='tags'>
              {
                blog.blogTags != undefined && blog.blogTags.map((tag,index)=>{
                  return (
                    <span key={index} className='tag'>{tag}</span>
                  )
                })
              }
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetails