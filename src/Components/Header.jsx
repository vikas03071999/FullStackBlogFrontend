import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/Header.scss'
import UserContext from '../Contexts/UserContext';

const Header = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

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
                    <li className='navItem'><a href={isLoggedIn ? "/Write-blog":"/Login-blog-app"}>WRITE</a></li>
                </ul>
            </div>
            <div className='rightSection'>
                {!user ? <ul className='navItems'>
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
