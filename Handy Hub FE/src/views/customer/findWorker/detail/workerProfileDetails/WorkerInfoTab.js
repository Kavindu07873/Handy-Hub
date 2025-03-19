import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, Input, Label } from 'reactstrap';

const WorkerInfoTab = ({ workerData }) => {
  // State for Profile Image
  const [avatar, setAvatar] = React.useState(workerData?.imageUrl || '');

  // Update avatar if workerData changes
  React.useEffect(() => {
    setAvatar(workerData?.imageUrl || '');
  }, [workerData]);

  // If no worker data is provided, show a message
  if (!workerData) return <p>No worker information available</p>;

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <Row className="align-items-center">
          {/* Profile Image */}
          <Col md="3" className="text-center">
            <img
              src={avatar || workerData.imageUrl}
              alt="Worker Profile"
              className="rounded-circle img-fluid"
              style={{ width: '120px', height: '120px', objectFit: 'cover', border: '3px solid #ddd' }}
            />
            <div className="mt-2">
              <small className="d-block mt-1 text-muted">Profile Image</small>
            </div>
          </Col>

          {/* Worker Information */}
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
                    plaintext
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
                    plaintext
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
                    plaintext
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
                    plaintext
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
                    plaintext
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
                    plaintext
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
                    plaintext
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
                    plaintext
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
                    plaintext
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
                    plaintext
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
                    plaintext
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default WorkerInfoTab;