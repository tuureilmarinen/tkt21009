import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import Blog from './Blog'
import {connect} from 'react-redux'

class User extends React.Component {
    render(){
        const users=this.props.users
        const user=users.find(u=>u._id==this.props.id)
        if(!user)
            return (<div></div>)
        return (
            <div>
                <h2>{user.username}</h2>
                <strong>{user.name}</strong>
                <h3>Blogs added</h3>
                {user.blogs.map(blog=>(
                    <div class="panel panel-default">
                        <div class="panel-heading">{blog.title}</div>
                        <div class="panel-body">
                            author: <strong>{blog.author}</strong> <br/>
                            url: <Link to={blog.url}>{blog.url}</Link> <br/>
                            <strong>{blog.likes} likes</strong>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const users=state.users
    return {
      users
    }
  }

export default connect(mapStateToProps, null )(User)