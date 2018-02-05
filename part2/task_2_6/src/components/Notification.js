
import React from 'react';
const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        <marquee><b>{message}</b></marquee>
      </div>
    )
  }
export default Notification
