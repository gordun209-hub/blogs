import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './authSlice'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const handleLogin = async e => {
    e.preventDefault()
    dispatch(login(email, password))

  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' />
        </label>
        <label>
          Password:
          <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
        </label>
        <input type='submit' value='Login' />
      </form>
    </div>
  )
}

export default LoginForm