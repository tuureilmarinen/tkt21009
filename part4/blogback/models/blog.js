const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.statics.format = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog