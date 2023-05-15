import React,{ useContext, useState } from 'react'
import "../Styles/Login.scss"
import { useNavigate } from 'react-router-dom';
import UserContext from '../Contexts/UserContext';

const Login = () => {

  const [loggingIn, setLoggingIn] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const userDetails = {
        email: e.target[0].value,
        password: e.target[1].value,
    }
    try{
      const res = await fetch("http://localhost:8082/blogapi/user/sign-in",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(userDetails)
      })
      if(res.status === 400){
        setWrongCredentials(true);
        return;
      }
      // console.log(await res.json());
      setUser(await res.json());
      navigate("/Blogs-home");
    }
    catch(err){
        console.log(err);
    }
    finally{
      setLoggingIn(false);
    }
  }

  return (
    <div className='loginContainer'>
      <div className="loginWrapper">
        <div className="loginFormContainer">
          <form className="loginFormWrapper" onSubmit={handleLogIn}>
            <h2>Log in</h2>
            <label htmlFor="email">Email</label>
            <input autoComplete='off' className='inputElement' id="email" type="email" placeholder='Enter your email' required onChange={()=>setWrongCredentials(false)}/>
            <label htmlFor="password">Password</label>
            <input autoComplete='off' className='inputElement' id="password" type="password" placeholder='Password' required onChange={()=>setWrongCredentials(false)}/>
            <button type="submit" disabled={loggingIn ? true: false} className='registerBtn'>{loggingIn ? <i className='fa-solid fa-spinner fa-spin'></i> :"Log in"}</button>
            {
              wrongCredentials && <p style={{color:"red",margin:"0",display:"flex",justifyContent:"center"}}>Wrong Credentials !!!</p>
            }
            <p style={{marginBottom:"0px",fontSize:"15px"}}>Don't have an account yet? <a style={{textDecoration:"none",color:"#1174E6"}} href="/Signup-blog-app">Register</a></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
