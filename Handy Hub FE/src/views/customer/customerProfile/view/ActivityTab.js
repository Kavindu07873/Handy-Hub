import React from 'react'

const ActivityTab = ({ userId }) => {
  return (
    <div>
      <h4>User Activity</h4>
      <p>Recent activities of user ID: {userId}</p>
    </div>
  )
}

export default ActivityTab
