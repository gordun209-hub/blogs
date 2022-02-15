import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/users/authSlice'
import blogReducer from '../features/blogs/blogsSlice'
import usersReducer from '../features/users/usersSlice'

const store = configureStore({
  reducer: {
    user: authReducer,
    blogs: blogReducer,
    users: usersReducer,
  },
})

export default store