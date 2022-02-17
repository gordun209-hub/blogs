import React from 'react'
import { createBlog } from './blogsSlice'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [author, setAuthor] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [url, setUrl] = React.useState('')
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  //create new blog
  const createNewBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ author, title, url }))
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createNewBlog} >
        <div>
          <label htmlFor='title'>Title: </label>
          <input type='text' value={title} onChange={handleTitleChange} name='title' id='title' />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input type='text' value={author} onChange={handleAuthorChange} name='author' id='author' />
        </div>
        <div>
          <label htmlFor='url'>Url: </label>
          <input type='text' value={url} onChange={handleUrlChange} name='url' id='url' />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )

}
export default BlogForm