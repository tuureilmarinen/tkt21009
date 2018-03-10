import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
    <a href={blog.url}>{blog.url}</a>
    <button onClick={blog.delete(blog.id)}>delete</button>
  </div>  
)
Togglable.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.url.isRequired
}

export default Blog