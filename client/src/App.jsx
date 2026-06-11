import './App.css'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/users/:userId/home" element={<Home />} />
        <Route path="/users/:userId/todos" element={<Todos />} />
        <Route path="/users/:userId/info" element={<Info />} />
        <Route path="/users/:userId/posts" element={<Posts />} />
        <Route path="/users/:userId/albums" element={<Albums />} />
        <Route path="/users/:userId/albums/:albumId/photos" element={<Photos />} />
        <Route path="/photos/:albumId" element={<Photos />} />
        <Route path="/users/:userId/posts/:postId/comments" element={<Comments />} /> */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App