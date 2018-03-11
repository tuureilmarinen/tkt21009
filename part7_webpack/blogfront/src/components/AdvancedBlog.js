import React from 'react'
import { Link } from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

class AdvancedBlog extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      comment: ""
    }
  }
  handleFieldChange = (event) => {
    //console.log(event.target.value)
    //debugger
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const { blog, handleSubmit } = this.props

    return (
      <div>
        <div class="panel panel-default">
          <div class="panel-heading">{blog.title}</div>
          <div class="panel-body">
            <Table>
              <tr><th>author</th><td>{blog.author}</td></tr>
              <tr><th>url</th><td><Link to={blog.url}>{blog.url}</Link></td></tr>
              <tr><th>likes</th><td>{blog.likes}</td></tr>
              <tr><th>added by</th><td><Link to={`/users/${blog.user.id}`}> {blog.user.name} </Link></td></tr>
            </Table>
            <hr/>
            <Table>
              {blog.comments.map(comment=>(
                <tr>
                  <td>
                    {comment}
                  </td>
                </tr>
              ))}
            </Table>
          <form onSubmit={this.props.handleSubmit}>
            <input type="hidden" name="blog_id" value={blog._id} />
            <input
              name="comment"
              value={this.state.comment}
              onChange={this.handleFieldChange}
            />
            <button type="submit">submit</button>
          </form>
          </div>
        </div>
      </div> 
    )
  }
}

export default AdvancedBlog