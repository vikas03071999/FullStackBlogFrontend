import React, { useState } from 'react'
import Header from '../Components/Header'
import '../Styles/Blogs.scss'
import ReactPaginate from 'react-paginate';
import SampleImage from '../assets/Images/SampleImage.jpg'
import SampleImage2 from '../assets/Images/SampleImage2.jpg'

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
  const pageCount = Math.ceil(blogsArray.length/9);
  const [pageNumber, setPageNumber] = useState(0);
  // Setting page number
  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };
  // Selecting the range of data to display according to the page number
  const blogsInDisplay = blogsArray.slice(pageNumber * 9, pageNumber * 9 + 9);
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
                <div className="latestBlogDetails">
                  <h2>ReactJS blog</h2>
                  <p>MAY 01,2023</p>
                  <span>ReactJS is a frontend library for building user interfaces...</span>
                </div>
              </div>
            </div>
          </div>
          <div className="allBlogsContainer">
            <div className="allBlogsWrapper">
              <h1>All Blogs</h1>
              <div className="blogs">
                {
                  blogsInDisplay.map((blog,index) => (
                    <div className="blog" key={index}>
                      <img src={blog.img} alt="blog-image" />
                      <span>{blog.title}</span>
                      <span>{blog.date}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          />
        </div>
      </div>  
    </>
  )
}

export default Blogs
