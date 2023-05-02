import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/Header.scss'

const Header = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='headerContainer'>
        <div className="headerWrapper">
            <div className='leftSection'>
                <div className='icons'>
                    <i className="fa-brands fa-facebook icon"></i>
                    <i className="fa-brands fa-twitter icon"></i>
                    <i className="fa-brands fa-pinterest icon"></i>
                    <i className="fa-brands fa-instagram icon"></i>
                </div>
            </div>
            <div className='middleSection'>
                <ul className='navItems'>
                    <li className='navItem'><a href="/Blogs-home">HOME</a></li>
                    <li className='navItem'><a href="">ABOUT</a></li>
                    <li className='navItem'><a href="">CONTACT</a></li>
                    <li className='navItem'><a href="/Write-blog">WRITE</a></li>
                </ul>
            </div>
            <div className='rightSection'>
                {!isLoggedIn ? <ul className='navItems'>
                    <li className='navItem'><a href="/Login-Blog-app">LOGIN</a></li>
                    <li className='navItem'><a href="/Signup-blog-app">REGISTER</a></li>
                </ul>:
                <div className='userAvatar' onClick={()=>navigate("/MyProfile")}>
                    <img className='userDp' src="https://res.cloudinary.com/dnkjyrvwf/image/upload/v1682434983/esjwpud938clorr9x0ag.jpg" alt="user-dp" />
                </div>}
            </div>
        </div>
    </div>
  )
}

export default Header
