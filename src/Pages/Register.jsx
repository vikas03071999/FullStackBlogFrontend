import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "../Styles/Register.scss"
import DP from '../assets/Images/addAvatar.png'


const Register = () => {
  
  const navigate = useNavigate();
  const [signingUp, setSigningUp] = useState(false);

  const handleSubmit = async(e) => {
    setSigningUp(true);
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    var imageUrl = "";
    if(e.target[4].files.length > 0){       // checking if user has uploaded any image or not
      const[imageFile] = e.target[4].files;
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const srcData = fileReader.result; // this will contain the base64 value of the img
        try{
          const apiUrl = 'http://localhost:8082/blogapi/fileHandler/uploadImage';
          const res = await fetch(apiUrl,{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              photo: srcData,
            })
          })
          const uploadedImageInfo = await res.json();
          imageUrl = uploadedImageInfo.url;
          signUpUser(firstName,lastName,email,password,imageUrl);
        }
        catch(err){
          console.log(err)
        }
      };
      fileReader.readAsDataURL(imageFile);
    }
    else{
      signUpUser(firstName,lastName,email,password,"");
    }
  }

  const signUpUser = async (firstName,lastName,email,password,imageUrl) => {
    const userDetails = {
      firstName,
      lastName,
      email,
      password,
      imageUrl
    };
    try{
        const res = await fetch("http://localhost:8082/blogapi/user/sign-up",{
                      method:"POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(userDetails)
                    });
        console.log(await res.json());
        setSigningUp(false);
        navigate("/Login-blog-app");
    }catch(err){
        console.log(err);
    }
  }

  return (
    <div className='registerContainer'>
      <div className="registerWrapper">
        <div className="signUpFormContainer">
          <form className="signUpFormWrapper" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label htmlFor="firstName">First name</label>
            <input autoComplete='off' className='inputElement' id='firstName' type='text' placeholder='John' required />
            <label htmlFor="lastName">Last name</label>
            <input autoComplete='off' className='inputElement' id='lastName' type='text' placeholder='Doe' required />
            <label htmlFor="email">Email</label>
            <input autoComplete='off' className='inputElement' id="email" type="email" placeholder='Enter your email' required />
            <label htmlFor="password">Password</label>
            <input autoComplete='off' className='inputElement' id="password" type="password" placeholder='Password' required />
            <label style={{display:"flex",alignItems:"center",gap:"5px",cursor:"pointer",marginTop:"3px"}} htmlFor="displayPicture"><img src={DP} alt="dp" style={{width:"40px",height:"40px"}} />Add a display picture</label>
            <input autoComplete='off' className='inputElement' id="displayPicture" type="file" style={{display:"none"}} />
            <button type="submit" disabled={signingUp ? true: false} className='registerBtn'>{signingUp ? <i className='fa-solid fa-spinner fa-spin'></i> :"Sign up"}</button>
            <p style={{marginBottom:"0px",fontSize:"15px"}}>Already have an account? <a style={{textDecoration:"none",color:"#1174E6"}} href="/Login-blog-app">Login</a></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
