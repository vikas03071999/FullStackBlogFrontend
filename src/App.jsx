import Blogs from './Pages/Blogs'
import Login from './Pages/Login'
import Register from './Pages/Register'
import WriteBlog from './Pages/WriteBlog'
import BlogDetails from './Pages/BlogDetails'
import UserProfile from './Pages/UserProfile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider from './Contexts/UserProvider'

// font-family: 'Open Sans', sans-serif;
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route path="/Signup-blog-app" element={<Register />} />
          <Route path="/Login-blog-app" element={<Login />} />
          <Route path="/Blogs-home" element={<Blogs />} />
          <Route path="/Write-blog" element={<WriteBlog />} />
          <Route path="/Edit-blog/:id" element={<WriteBlog />} />
          <Route path="/Blog-detail" element={<BlogDetails />} />
          <Route path="/My-profile" element={<UserProfile />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
