import React from 'react'
import { Card, CardBody, CardTitle, CardText, Badge } from 'reactstrap'

const UserInfoCard = ({ selectedUser }) => {
  if (!selectedUser) {
    return <p className="text-muted">No user selected.</p>
  }

  return (
    <Card className="shadow-sm border rounded p-3">
      <CardBody>
        <CardTitle tag="h4" className="mb-3">{selectedUser.name || 'N/A'}</CardTitle>
        <CardText>
          <strong>Email:</strong> {selectedUser.email || 'N/A'} <br />
          <strong>Role:</strong> {selectedUser.role || 'N/A'} <br />
          <strong>Status:</strong>{' '}
          <Badge color={selectedUser.status === 'Active' ? 'success' : 'danger'}>
            {selectedUser.status || 'N/A'}
          </Badge>{' '}
          <br />
          <strong>Company:</strong> {selectedUser.company || 'N/A'} <br />
          <strong>Phone:</strong> {selectedUser.phone || 'N/A'} <br />
          <strong>Address:</strong> {selectedUser.address || 'N/A'}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default UserInfoCard
