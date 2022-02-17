import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    initBlogs: (state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      state.push(action.payload)
    },
  },
})

export const { addBlog, setBlogs, setError, initBlogs } = blogsSlice.actions
export default blogsSlice.reducer

export const createBlog = (blog) => async (dispatch) => {
  try {
    const newBlog = await blogsService.create(blog)
    dispatch(addBlog(newBlog))
  } catch (error) {
    dispatch(setError(error.message))
  }
}

export const initializeBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogsService.getAll()
    dispatch(initBlogs(blogs))
  } catch (error) {
    console.error(error)
  }
}
