import React from 'react'
import { Row, Col, Card, CardBody, CardTitle, Input, Label } from 'reactstrap'

const WorkerInfoTab = ({ workerData }) => {
  // ** Gender-specific Default Profile Images
  const maleFallbackImage =
    'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'
  const femaleFallbackImage =
    'https://th.bing.com/th/id/OIP.MVJcYEbxpX4e2MAmqWtXAwHaHa?rs=1&pid=ImgDetMain'
  const genericFallbackImage =
    'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'

  if (!workerData) return <p>No worker information available</p>

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <Row className="align-items-center">
          {/* Profile Image */}
          <Col md="3" className="text-center">
            <img
              src={
                workerData.imageUrl ||
                (workerData.gender === 'MALE'
                  ? maleFallbackImage
                  : workerData.gender === 'FEMALE'
                    ? femaleFallbackImage
                    : genericFallbackImage)
              }
              alt="Worker Profile"
              className="rounded-circle img-fluid"
              style={{ width: '120px', height: '120px', objectFit: 'cover', border: '3px solid #ddd' }}
            />
          </Col>

          {/* Worker Info */}
          <Col md="9">
            <CardTitle tag="h3" className="mb-3 text-primary">
              {workerData.username || 'Worker Name Not Available'}
            </CardTitle>
            <div className="text-muted">
              <Row>
                {/* Basic Information */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Username:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={workerData.username || ''}
                    readOnly
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Last Name:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={workerData.lastName || ''}
                    readOnly
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Email:</strong>
                  </Label>
                  <Input
                    type="email"
                    value={workerData.email || ''}
                    readOnly
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Mobile:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={workerData.mobileNumber || ''}
                    readOnly
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Type:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={workerData.workerType || ''}
                    readOnly
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Rank:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={workerData.workerRank || ''}
                    readOnly
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Gender:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={workerData.gender || ''}
                    readOnly
                  />
                </Col>

                {/* Additional Information */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Status:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={workerData.status || ''}
                    readOnly
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>User Role:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={workerData.userRole || ''}
                    readOnly
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Image URL:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={workerData.imageUrl || ''}
                    readOnly
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Worker ID:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={workerData.id || ''}
                    readOnly
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default WorkerInfoTab