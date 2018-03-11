import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import {connect} from 'react-redux'

class UserList extends React.Component {
    render(){
        const users=this.props.users
        return (
            <div>
                <Table striped>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user._id}`}>{user.username}</Link>
                            </td>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>
                    ))}
                </Table>
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

export default connect(mapStateToProps, null )(UserList)