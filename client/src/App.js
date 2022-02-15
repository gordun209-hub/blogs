import React, { useEffect, useState } from 'react'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { flatten, pluck } from 'ramda'
import BlogForm from './components/BlogForm'
import LoginForm from './components/loginform'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { createNewBlog, initializeBlogs } from './Features/Blogs/blogsSlice'
import { initializeUsers } from './Features/Users/usersSlice'
import {
  initializeUser,
  loginFailure,
  loginUser,
  logout,
} from './Features/Users/authUserSlice'
import Users from './components/Users'
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authUser.user)
  const users = useSelector(state => state.users)

  //---------------------------hooks---------------- //
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //fetching blogs

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeUser())
  }, [dispatch])
  // ----------------------------------------------------------------//
  const handleLogin = async e => {
    e.preventDefault()
    try {
      dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
    } catch (err) {
      dispatch(loginFailure(err))
    }
  }
  // LOGINFORM
  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  // BLOGFORM// lopgut
  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm   />
      <Button
        variant="danger"
        onClick={() => {
          localStorage.clear()
          dispatch(logout())
        }}
      >
        Logout
      </Button>
    </Togglable>
  )

  const findLoggedInUser =
    user && users.filter(userz => userz.username === user.username)
  const loggedInuserBlogs = user && flatten(pluck('blogs')(findLoggedInUser))

  return (
    <div style={{ class: 'w3-highway-schoolbus' }}>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div style={{ display: 'flex' }}>
            <p>{user.name} logged in</p>
          </div>
          {blogForm()}{' '}
          {loggedInuserBlogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      <Users />
    </div>
  )
}

export default App
