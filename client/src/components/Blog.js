import React from 'react'

const Blog = ({ blog }) => {
  return (
    <>
      <h1>Author :{blog.author}</h1>
      <h2>Title :{blog.title} </h2>
      <h3>Url :{blog.url}</h3>


    </>
  )
}

export default Blog