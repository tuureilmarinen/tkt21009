import React from 'react'
import { connect } from 'react-redux'
import {clearNotification} from './../reducers/notificationReducer'

class Notification extends React.Component {
  clear = async () => {
    console.log("clearing")
    //debugger
    await this.props.clearNotification()
  }
  
  render() {
    const {notification} = this.props
    if (notification.length===0) {
      return null
    }
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    return (
      <div onClick={this.clear} style={style}>
        {notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //debugger
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps,{clearNotification})(Notification)