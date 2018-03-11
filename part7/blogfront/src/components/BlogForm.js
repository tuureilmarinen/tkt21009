import React from 'react'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class BlogForm extends React.Component {
  create = async (event) => {
    event.persist()
    event.preventDefault()
    console.log("create")

    const blog = {
      url:event.target.url.value,
      title: event.target.title.value,
      author: event.target.author.value,
      likes: 0
    }
    await this.props.createBlog(blog)
    this.props.notify(`Blog ${blog.title} created`, 5000)
    event.target.url.value =""
    event.target.title.value=""
    event.target.author.value=""
  }
  render(){
    const { title, author, url, handleChange } = this.props
    return (
      <div>
        <h2>Luo uusi blogi</h2>

        <form onSubmit={this.create}>
          <div>
            title
            <input
              value={title}
              name='title'
              onChange={handleChange}
            />
          </div>
          <div>
            author
            <input
              value={author}
              name='author'
              onChange={handleChange}
            />
          </div>
          <div>
            url
            <input
              value={url}
              name='url'
              onChange={handleChange}
            />
          </div>        

          <button type="submit">Luo</button>
        </form>
      </div>
    )
  }
}

BlogForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  //debugger
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { createBlog, notify  } )(BlogForm)