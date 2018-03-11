import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import Blog from './Blog'

const User = ({user}) => {
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

export default User