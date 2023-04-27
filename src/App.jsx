import './App.css'
import Blogs from './Pages/Blogs'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {BrowserRouter, Route, Routes } from 'react-router-dom'

// font-family: 'Open Sans', sans-serif;
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = "/" element = {<Register />} />
        <Route path = "/Signup-blog-app" element = {<Register />} />
        <Route path = "/Login-blog-app" element = {<Login />} />
        <Route path = "/Blogs-home" element={<Blogs />} />
      </Routes>  
    </BrowserRouter>
  )
}

export default App
