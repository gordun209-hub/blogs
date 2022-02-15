import loginService from '../../services/login'
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.error = null
    },
    loginFailure: (state, action) => {
      state.user = null
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.error = null
    },
  },
})
export const initializeUser = () => {
  const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJson) {
    const user = JSON.parse(loggedUserJson)
    blogService.setToken(user.token)
    return authSlice.actions.loginSuccess(user)

  }
  return loginFailure()
}
export const login = (username, password) => async dispatch => {
  try {
    const user = await loginService.login({ username, password })

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(loginSuccess(user))
  } catch (exception) {
    dispatch(loginFailure(exception))
  }
}
export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  blogService.setToken(null)
  return logout()
}


export const { loginSuccess, loginFailure, logout } = authSlice.actions

export default authSlice.reducer