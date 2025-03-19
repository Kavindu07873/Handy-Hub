import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, Input, Label } from 'reactstrap';

const UserInfoTab = ({ userData }) => {
  // ** State for Profile Image
  const [avatar, setAvatar] = React.useState(userData.image || '');

  // Update avatar if userData changes
  React.useEffect(() => {
    setAvatar(userData.image || '');
  }, [userData]);

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <Row className="align-items-center">
          {/* Profile Image */}
          <Col md="3" className="text-center">
            <img
              src={avatar || userData.image}
              alt="User Profile"
              className="rounded-circle img-fluid"
              style={{ width: '120px', height: '120px', objectFit: 'cover', border: '3px solid #ddd' }}
            />
            <div className="mt-2">
              <small className="d-block mt-1 text-muted">Profile Image</small>
            </div>
          </Col>

          {/* User Info */}
          <Col md="9">
            <CardTitle tag="h3" className="mb-3 text-primary">
              {userData.name || 'User Name Not Available'}
            </CardTitle>
            <div className="text-muted">
              <Row>
                {/* Email */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Email:</strong>
                  </Label>
                  <Input
                    type="email"
                    value={userData.email || ''}
                    readOnly
                    plaintext
                  />
                </Col>

                {/* Role */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Role:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={userData.role || ''}
                    readOnly
                    plaintext
                  />
                </Col>

                {/* Status */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Status:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={userData.status || ''}
                    readOnly
                    plaintext
                  />
                </Col>

                {/* Company */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Company:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={userData.company || ''}
                    readOnly
                    plaintext
                  />
                </Col>

                {/* Phone */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Phone:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={userData.phone || ''}
                    readOnly
                    plaintext
                  />
                </Col>

                {/* Address */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Address:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={userData.address || ''}
                    readOnly
                    plaintext
                  />
                </Col>

                {/* Timezone */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Timezone:</strong>
                  </Label>
                  <Input
                    type="text"
                    value={userData.timezone || ''}
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

export default UserInfoTab;