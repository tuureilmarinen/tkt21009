import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import {connect} from 'react-redux'

class BlogList extends React.Component {
    render(){
        const blogs=this.props.blogs
        return (
            <div>
                <Table striped>
                    {blogs.map(blog => (
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                            </td>
                            <td>
                                {blog.author}
                            </td>
                            <td>
                                {blog.likes}
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const blogs=state.blogs
    return {
      blogs
    }
  }

export default connect(mapStateToProps, null )(BlogList)