import React, { useEffect, useState } from 'react'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './features/blogs/BlogForm'
import LoginForm from './features/users/LoginForm'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {  initializeBlogs } from './features/blogs/blogsSlice'
import { initializeUsers } from '../src/features/users/usersSlice'
import {
  initializeUser,
  loginFailure,
  login,
  logout,
} from './features/users/authSlice'
const App = () => {


  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const blogs = useSelector(state => state.blogs)

  //---------------------------hooks---------------- //
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //fetching blogs

  useEffect(() => {

    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())

  }, [dispatch])
  // ----------------------------------------------------------------//
  const handleLogin = async e => {
    e.preventDefault()
    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
    } catch (err) {
      dispatch(loginFailure(err))
    }
  }
  // LOGINFORM
  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm />
      <Button
        variant='danger'
        onClick={() => {
          localStorage.clear()
          dispatch(logout())
        }}>
        Logout
      </Button>
    </Togglable>
  )

  const otherBlogs = () => {
    const userId =user&& user.username
    return  blogs.filter(blog => blog.user.username !== userId)

  }

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div style={{ display: 'flex' }}>
            <p>{user.name} logged in</p>
          </div>
          {blogForm()}{' '}
          {user&&otherBlogs().map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
