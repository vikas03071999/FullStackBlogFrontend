import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import '../Styles/Blogs.scss'
import ReactPaginate from 'react-paginate';
import SampleImage from '../assets/Images/SampleImage.jpg'
import SampleImage2 from '../assets/Images/SampleImage2.jpg'
import { useNavigate, useNavigation } from 'react-router-dom';

const Blogs = () => {
  const blogsArray = [
    {
      "title": "Blog Title1",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title2",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title3",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title4",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title5",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title6",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title7",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title8",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title9",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title10",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title11",
      "date": "MAY 01,2023",
      "img": SampleImage
    },
    {
      "title": "Blog Title12",
      "date": "MAY 01,2023",
      "img": SampleImage
    }
  ]
  // Calculating the number of pages required based on the length of the data
  
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchAllBlogs = async() => {
      try{
        const res = await fetch(`http://localhost:8082/blogapi/bloghandler/all-blogs`);
        const allBlogs = await res.json();
        setBlogs(allBlogs);
      } catch(err){
        console.log(err);
      }
    }
    fetchAllBlogs();
  },[]);

  const pageCount = Math.ceil(blogs?.length/9);
  const [pageNumber, setPageNumber] = useState(0);
  // Setting page number
  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };
  // Selecting the range of data to display according to the page number
  const blogsInDisplay = blogs?.slice(pageNumber * 9, pageNumber * 9 + 9);

  const generatePrettyDate = (originalDate) => {
    var dateObj = new Date(originalDate);
    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    return dateObj.toLocaleDateString('en-GB',options);
  }
  return (
    <>
      <Header />
      <div className='blogsHomeContainer'>
        <div className='blogsHomeWrapper'>
          <div className="blogsPoster">
            <h1>Blogs</h1>
          </div>
          <div className="latestBlogContainer">
            <div className="latestBlogWrapper">
              <h1>Latest Blog</h1>
              <div className="latestBlogInfo">
                <img src={SampleImage2} alt="latest-blog-image" />
                <div className="latestBlogDetails" onClick={()=>navigate(`/Blog-detail?blogId=${blogs[0]._id}`)}>
                  <h2>{blogs.length > 0 && blogs[0].blogTitle}</h2>
                  <p>{blogs.length > 0 && generatePrettyDate(blogs[0].blogDate)}</p>
                  <span>{blogs.length > 0 && blogs[0].blogDescription.substr(0,60)}...<span style={{color:"black"}}> more</span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="allBlogsContainer">
            <div className="allBlogsWrapper">
              <h1>All Blogs</h1>
              <div className="blogs">
                {
                  blogsInDisplay.length > 0 && blogsInDisplay.map((blog,index) => (
                    <div key={blog._id} className="blog" onClick={()=>navigate(`/Blog-detail?blogId=${blog._id}`)}>
                      <img src={SampleImage} alt="blog-image" />
                      <span>{blog.blogTitle}</span>
                      <span>{generatePrettyDate(blog.blogDate)}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          { blogs.length > 9 && <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          />}
        </div>
      </div>  
    </>
  )
}

export default Blogs
