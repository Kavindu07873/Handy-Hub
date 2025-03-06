import React from 'react'
import { Row, Col, Card, CardBody, CardTitle, Input, Label, Button } from 'reactstrap'

const WorkerInfoTab = ({ workerData }) => {
  const [avatar, setAvatar] = React.useState(workerData?.imageUrl || '')
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [formData, setFormData] = React.useState({ ...workerData })

  React.useEffect(() => {
    setFormData({ ...workerData })
    setAvatar(workerData?.imageUrl || '')
  }, [workerData])

  const onChange = (e) => {
    const reader = new FileReader()
    const files = e.target.files
    reader.onload = () => {
      setAvatar(reader.result)
      setFormData((prev) => ({ ...prev, imageUrl: reader.result }))
    }
    reader.readAsDataURL(files[0])
  }

  const handleImgReset = () => {
    setAvatar('')
    setFormData((prev) => ({ ...prev, imageUrl: '' }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateClick = async () => {
    try {
      console.log('Updating worker data:', formData)
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsEditMode(false)
    } catch (error) {
      console.error('Error updating worker data:', error)
    }
  }

  const handleCancel = () => {
    setFormData({ ...workerData })
    setIsEditMode(false)
  }

  if (!workerData) return <p>No worker information available</p>

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <Row className="align-items-center">
          <Col md="3" className="text-center">
            <img
              src={avatar || formData.imageUrl}
              alt="Worker Profile"
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

          <Col md="9">
            <CardTitle tag="h3" className="mb-3 text-primary">
              {formData.username || 'Worker Name Not Available'}
            </CardTitle>
            <div className="text-muted">
              <Row>
                {/* Basic Information */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Username:</strong>
                  </Label>
                  <Input
                    name="username"
                    type="text"
                    defaultValue={formData.username || ''}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Last Name:</strong>
                  </Label>
                  <Input
                    name="lastName"
                    type="text"
                    defaultValue={formData.lastName || ''}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Email:</strong>
                  </Label>
                  <Input
                    name="email"
                    type="email"
                    defaultValue={formData.email || ''}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Mobile:</strong>
                  </Label>
                  <Input
                    name="mobileNumber"
                    type="text"
                    defaultValue={formData.mobileNumber || ''}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Type:</strong>
                  </Label>
                  <Input
                    name="workerType"
                    type="text"
                    defaultValue={formData.workerType || ''}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Rank:</strong>
                  </Label>
                  <Input
                    name="workerRank"
                    type="text"
                    defaultValue={formData.workerRank || ''}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Gender:</strong>
                  </Label>
                  <Input
                    name="gender"
                    type="text"
                    defaultValue={formData.gender || ''}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </Col>

                {/* Additional Information */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Status:</strong>
                  </Label>
                  <Input
                    name="status"
                    type="text"
                    defaultValue={formData.status || ''}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>User Role:</strong>
                  </Label>
                  <Input
                    name="userRole"
                    type="text"
                    defaultValue={formData.userRole || ''}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Image URL:</strong>
                  </Label>
                  <Input
                    name="imageUrl"
                    type="text"
                    defaultValue={formData.imageUrl || ''}
                    readOnly={!isEditMode}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col sm="6" className="mb-1">
                  <Label className="form-label">
                    <strong>Worker ID:</strong>
                  </Label>
                  <Input
                    name="id"
                    type="text"
                    defaultValue={formData.id || ''}
                    readOnly
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-3">
                {!isEditMode ? (
                  <Button color="primary" size="sm" onClick={() => setIsEditMode(true)}>
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button color="success" size="sm" className="me-2" onClick={handleUpdateClick}>
                      Update
                    </Button>
                    <Button color="secondary" size="sm" onClick={handleCancel}>
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

export default WorkerInfoTab