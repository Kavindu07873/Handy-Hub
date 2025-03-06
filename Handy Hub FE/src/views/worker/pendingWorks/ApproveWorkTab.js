import React from 'react'
import '~@fortawesome/fontawesome-free/css/all.min.css'

import { Card, CardBody, CardTitle, CardText, Button,
  ListGroup, ListGroupItem, Row, Col, Input, Label,
  Media, Progress, Badge } from 'reactstrap'

const ApproveWorkTab = ({ works }) => {
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [workData, setWorkData] = React.useState(works || [])

  React.useEffect(() => {
    setWorkData(works || [])
  }, [works])

  const handleApprove = (index) => {
    const newWorks = [...workData]
    newWorks[index].status = 'approved'
    setWorkData(newWorks)
  }

  const handleReject = (index) => {
    const newWorks = [...workData]
    newWorks[index].status = 'rejected'
    setWorkData(newWorks)
  }

  const handleInputChange = (index, field, value) => {
    const newWorks = [...workData]
    newWorks[index][field] = value
    setWorkData(newWorks)
  }

  if (workData.length === 0) {
    return (
      <Card className="shadow-lg border-0 rounded">
        <CardBody>
          <CardTitle tag="h3" className="mb-4 text-primary">
            <i className="fas fa-tasks me-2"></i>Monthly Work Approval
          </CardTitle>
          <p className="text-center text-muted py-4">
            No pending work approvals found
          </p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <CardTitle tag="h3" className="mb-4 text-primary">
          <i className="fas fa-tasks me-2"></i>Monthly Work Approval
        </CardTitle>

        <ListGroup flush>
          {workData.map((work, index) => (
            <ListGroupItem key={index} className="p-4">
              <Row>
                <Col md={8}>
                  <Media>
                    <div className="me-3">
                      <i className="fas fa-toolbox fa-2x text-info"></i>
                    </div>
                    <Media body>
                      <h5 className="mt-0">{work.title}</h5>
                      <CardText className="text-muted mb-1">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {work.address}
                      </CardText>
                      <CardText className="mb-1">
                        <i className="fas fa-calendar-alt me-2"></i>
                        Due: {new Date(work.dueDate).toLocaleDateString()}
                      </CardText>
                      <div className="mt-2">
                        <Badge color={work.status === 'pending' ? 'warning' :
                          work.status === 'approved' ? 'success' : 'danger'}>
                          {work.status.toUpperCase()}
                        </Badge>
                      </div>
                    </Media>
                  </Media>
                </Col>

                <Col md={4} className="text-md-right mt-3 mt-md-0">
                  <h4 className="text-primary mb-2">${work.price}</h4>
                  <div className="mb-3">
                    <Progress
                      value={work.completion || 0}
                      color="info"
                      className="mb-2"
                    />
                    <small className="text-muted">{work.completion || 0}% Complete</small>
                  </div>

                  <div className="d-flex justify-content-end">
                    {!isEditMode && work.status === 'pending' && (
                      <>
                        <Button
                          color="success"
                          className="me-2"
                          onClick={() => handleApprove(index)}
                        >
                          <i className="fas fa-check"></i> Approve
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => handleReject(index)}
                        >
                          <i className="fas fa-times"></i> Reject
                        </Button>
                      </>
                    )}

                    {isEditMode && (
                      <Button
                        color="secondary"
                        onClick={() => setIsEditMode(false)}
                      >
                        <i className="fas fa-save"></i> Save
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>

              <div className={`mt-3 ${isEditMode ? 'd-block' : 'd-none'}`}>
                <Row>
                  <Col md={6}>
                    <Label className="form-label">Work Description</Label>
                    <Input
                      type="textarea"
                      rows="3"
                      defaultValue={work.description}
                      onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    />
                  </Col>

                  <Col md={6}>
                    <Label className="form-label">Special Instructions</Label>
                    <Input
                      type="textarea"
                      rows="3"
                      defaultValue={work.instructions}
                      onChange={(e) => handleInputChange(index, 'instructions', e.target.value)}
                    />
                  </Col>
                </Row>
              </div>

              <div className="mt-3">
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  <i className={`fas ${isEditMode ? 'fa-eye' : 'fa-edit'} me-2`}></i>
                  {isEditMode ? 'View Mode' : 'Edit Details'}
                </Button>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  )
}

export default ApproveWorkTab