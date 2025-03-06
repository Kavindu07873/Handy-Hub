// src/views/worker/approveWorks/ApprovedTasksTab.js
import React from 'react'
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem,
  Media, Progress, Badge } from 'reactstrap'

const ApprovedTasksTab = ({ works }) => {
  const approvedWorks = works.filter(w => w.status === 'approved')

  if (approvedWorks.length === 0) {
    return (
      <Card className="shadow-lg border-0 rounded">
        <CardBody>
          <CardTitle tag="h3" className="mb-4 text-primary">
            <i className="fas fa-check-double me-2"></i>Approved Tasks
          </CardTitle>
          <p className="text-center text-muted py-4">
            No approved tasks found
          </p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <CardTitle tag="h3" className="mb-4 text-primary">
          <i className="fas fa-check-double me-2"></i>Approved Tasks
        </CardTitle>

        <ListGroup flush>
          {approvedWorks.map((work, index) => (
            <ListGroupItem key={index} className="p-4">
              <Media>
                <div className="me-3">
                  <i className="fas fa-clipboard-check fa-2x text-success"></i>
                </div>
                <Media body>
                  <h5 className="mt-0">{work.title}</h5>
                  <p className="text-muted mb-1">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {work.address}
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-calendar-alt me-2"></i>
                    Due: {new Date(work.dueDate).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <Badge color="success">APPROVED</Badge>
                  </div>
                </Media>
              </Media>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  )
}

export default ApprovedTasksTab