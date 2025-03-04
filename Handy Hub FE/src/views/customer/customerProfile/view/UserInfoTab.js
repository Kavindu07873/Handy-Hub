import React from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardText, Badge, Button, Input, Label } from 'reactstrap'

const UserInfoTab = ({ userData }) => {
  // ** State for Profile Image
  const [avatar, setAvatar] = React.useState(userData.image || '')
  const [isEditMode, setIsEditMode] = React.useState(false)// Toggle between view and edit modes
  const [formData, setFormData] = React.useState({ ...userData }) // Manage form data dynamically

  // ** Handle Image Upload
  const onChange = (e) => {
    const reader = new FileReader()
    const files = e.target.files
    reader.onload = () => {
      setAvatar(reader.result)
      setFormData((prevData) => ({ ...prevData, image: reader.result }))
    }
    reader.readAsDataURL(files[0])
  }

  // ** Handle Image Reset
  const handleImgReset = () => {
    setAvatar('')
    setFormData((prevData) => ({ ...prevData, image: '' }))
  }

  // ** Handle Form Field Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // ** Handle Edit Mode
  const handleEditClick = () => {
    setIsEditMode(true)
  }

  // ** Handle Update Mode
  const handleUpdateClick = async () => {
    try {
      // Simulate an API call to update the data
      console.log('Updating data:', formData)

      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock API delay

      // Switch back to view mode after successful update
      setIsEditMode(false)
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <Row className="align-items-center">
          {/* Profile Image */}
          <Col md="3" className="text-center">
            <img
              src={
                avatar ||
                formData.image
                // 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'
              }
              alt="User Profile"
              className="rounded-circle img-fluid"
              style={{ width: '120px', height: '120px', objectFit: 'cover', border: '3px solid #ddd' }}
            />
            <div className="mt-2">
              <Button color="primary" size="sm" className="me-1">
                <label htmlFor="upload-image" style={{ cursor: 'pointer', margin: 0 }}>
                  Upload
                </label>
                <input
                  id="upload-image"
                  type="file"
                  accept="image/*"
                  onChange={onChange}
                  style={{ display: 'none' }}
                />
              </Button>
              <Button color="secondary" size="sm" onClick={handleImgReset}>
                Reset
              </Button>
              <small className="d-block mt-1 text-muted">Allowed JPG, GIF or PNG. Max size of 800kB</small>
            </div>
          </Col>

          {/* User Info */}
          <Col md="9">
            <CardTitle tag="h3" className="mb-3 text-primary">
              {formData.name || 'User Name Not Available'}
            </CardTitle>
            <div className="text-muted">
              <Row>
                {/* Email */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="email">
                    <strong>Email:</strong>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    defaultValue={formData.email || ''}
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Role */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="role">
                    <strong>Role:</strong>
                  </Label>
                  <Input
                    id="role"
                    placeholder="Role"
                    defaultValue={formData.role || ''}
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Status */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="status">
                    <strong>Status:</strong>
                  </Label>
                  <Input
                    id="status"
                    placeholder="Status"
                    defaultValue={formData.status || ''}
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Company */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="company">
                    <strong>Company:</strong>
                  </Label>
                  <Input
                    id="company"
                    placeholder="Company"
                    defaultValue={formData.company || ''}
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Phone */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="phone">
                    <strong>Phone:</strong>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Phone"
                    defaultValue={formData.phone || ''}
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Address */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="address">
                    <strong>Address:</strong>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Address"
                    defaultValue={formData.address || ''}
                    onChange={handleInputChange} // Allow editing in edit mode
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Timezone */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="timezone">
                    <strong>Timezone:</strong>
                  </Label>
                  <Input
                    id="timezone"
                    placeholder="Timezone"
                    defaultValue={formData.timezone || ''}
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>
              </Row>

              {/* Edit and Update Buttons */}
              <div className="d-flex justify-content-end mt-3">
                {!isEditMode ? (
                  <Button color="primary" size="sm" onClick={handleEditClick}>
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button color="success" size="sm" className="me-2" onClick={handleUpdateClick}>
                      Update
                    </Button>
                    <Button color="secondary" size="sm" onClick={() => setIsEditMode(false)}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default UserInfoTab