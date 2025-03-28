import React from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardText, Badge, Button, Input, Label } from 'reactstrap'

const UserInfoTab = ({ userData }) => {
  // ** State for Profile Image
  const [avatar, setAvatar] = React.useState(userData.image || '')
  const [isEditMode, setIsEditMode] = React.useState(false) // Toggle between view and edit modes
  const [formData, setFormData] = React.useState({ ...userData }) // Manage form data dynamically

  // ** List of Worker Types
  const workerTypes = [
    { value: 'ELECTRICIAN', label: 'Electrician' },
    { value: 'PLUMBER', label: 'Plumber' },
    { value: 'MESHAN_BASS', label: 'Meshan_bass' },
    { value: 'PAINTER', label: 'Painter' },
    { value: 'LABORER', label: 'Laborer' },
    { value: 'TRAINEE', label: 'Trainee' },
  ]

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
      // Prepare the payload to send to the backend
      const payload = {
        ...formData,
        image: avatar || formData.image, // Include the image URL
      }

      console.log('Sending payload:', payload)

      // Send the API request to update the profile
      const response = await fetch('http://localhost:8080/worker/UpdateProfile', {
        method: 'POST', // or 'PUT' depending on your backend implementation
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const result = await response.json()
      console.log('Profile updated successfully:', result)

      // Show success message
      alert('Profile updated successfully')

      // Switch back to view mode after successful update
      setIsEditMode(false)

      // Optionally refresh the page to reflect the updated data
      // window.location.reload()
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('An error occurred while updating the profile. Please try again.')
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
                formData.image ||
                'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'
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
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email || ''}
                    onChange={handleInputChange} // Update state dynamically
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
                    name="role"
                    placeholder="Role"
                    value={formData.role || ''}
                    onChange={handleInputChange} // Update state dynamically
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
                    name="status"
                    placeholder="Status"
                    value={formData.status || ''}
                    onChange={handleInputChange} // Update state dynamically
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Worker Type Dropdown */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="workerType">
                    <strong>Worker Type:</strong>
                  </Label>
                  <Input
                    id="workerType"
                    name="workerType"
                    type="select"
                    value={formData.workerType || ''} // Set default value from formData
                    onChange={handleInputChange} // Update state dynamically
                    disabled={!isEditMode} // Disable in view mode
                  >
                    <option value="">Select Worker Type</option>
                    {workerTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Input>
                </Col>

                {/* Company */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="company">
                    <strong>Company:</strong>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Company"
                    value={formData.company || ''}
                    onChange={handleInputChange} // Update state dynamically
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
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange} // Update state dynamically
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
                    value={formData.address || ''}
                    onChange={handleInputChange} // Update state dynamically
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