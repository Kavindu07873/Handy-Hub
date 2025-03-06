import React from 'react'
import { Card, CardBody, CardTitle, Button, Input, Label, Row, Col,
  ListGroup, ListGroupItem, Media } from 'reactstrap'
import '~@fortawesome/fontawesome-free/css/all.min.css'

const SkillsTab = ({ userData }) => {
  const [isEditMode, setIsEditMode] = React.useState(false)
  const [formData, setFormData] = React.useState({
    education: userData.education || '',
    professionalSkills: userData.professionalSkills?.map(skill => ({
      text: skill.text,
      image: skill.image || ''
    })) || [],
    softSkills: userData.softSkills || '',
    documents: userData.documents || []
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      documents: [
        ...prev.documents,
        ...files.map(file => ({
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file)
        }))
      ]
    }))
  }

  const handleSkillImageUpload = (index, file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newSkills = [...formData.professionalSkills]
      newSkills[index].image = e.target.result
      setFormData(prev => ({ ...prev, professionalSkills: newSkills }))
    }
    reader.readAsDataURL(file)
  }

  const handleUpdate = async () => {
    try {
      console.log('Updating skills/education:', formData)
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsEditMode(false)
    } catch (error) {
      console.error('Update failed:', error)
    }
  }

  const handleCancel = () => {
    setFormData({
      education: userData.education || '',
      professionalSkills: userData.professionalSkills?.map(skill => ({
        text: skill.text,
        image: skill.image || ''
      })) || [],
      softSkills: userData.softSkills || '',
      documents: userData.documents || []
    })
    setIsEditMode(false)
  }

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <CardTitle tag="h3" className="mb-4 text-primary">
          <i className="fas fa-user-graduate me-2"></i>Professional Development
        </CardTitle>

        <Row className="gy-4">
          {/* Education Section */}
          <Col md={4}>
            <Card className="border">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="text-info mb-0">
                    <i className="fas fa-graduation-cap me-2"></i>Education
                  </h5>
                  {!isEditMode && (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => setIsEditMode(true)}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                  )}
                </div>

                {isEditMode ? (
                  <Input
                    type="textarea"
                    name="education"
                    rows="5"
                    placeholder="Enter education details..."
                    value={formData.education}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="text-muted">
                    {formData.education.split('\n').map((line, index) => (
                      <div key={index}>{line || '-'}</div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>

          {/* Professional Skills Section */}
          <Col md={4}>
            <Card className="border">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="text-warning mb-0">
                    <i className="fas fa-briefcase me-2"></i>Professional Skills
                  </h5>
                  {isEditMode && (
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        professionalSkills: [
                          ...prev.professionalSkills,
                          { text: '', image: '' }
                        ]
                      }))}
                    >
                      <i className="fas fa-plus"></i> Add Skill
                    </Button>
                  )}
                </div>

                {formData.professionalSkills.map((skill, index) => (
                  <div key={index} className="mb-3">
                    {isEditMode ? (
                      <>
                        <Input
                          type="text"
                          placeholder="Skill name"
                          value={skill.text}
                          onChange={(e) => {
                            const newSkills = [...formData.professionalSkills]
                            newSkills[index].text = e.target.value
                            setFormData(prev => ({ ...prev, professionalSkills: newSkills }))
                          }}
                        />
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSkillImageUpload(index, e.target.files[0])}
                        />
                      </>
                    ) : (
                      <Media>
                        {skill.image && (
                          <Media left className="me-3">
                            <img
                              src={skill.image}
                              alt={skill.text}
                              style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                              className="rounded"
                            />
                          </Media>
                        )}
                        <Media body>
                          <h6 className="mt-0">{skill.text || '-'}</h6>
                        </Media>
                      </Media>
                    )}
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>

          {/* Soft Skills Section */}
          <Col md={4}>
            <Card className="border">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="text-success mb-0">
                    <i className="fas fa-users me-2"></i>Soft Skills
                  </h5>
                  {!isEditMode && (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => setIsEditMode(true)}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                  )}
                </div>

                {isEditMode ? (
                  <Input
                    type="textarea"
                    name="softSkills"
                    rows="5"
                    placeholder="Enter soft skills..."
                    value={formData.softSkills}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="text-muted">
                    {formData.softSkills.split('\n').map((line, index) => (
                      <div key={index}>{line || '-'}</div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>

          {/* Document Upload Section */}
          <Col md={12}>
            <Card className="border">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="text-secondary mb-0">
                    <i className="fas fa-file-alt me-2"></i>Documents
                  </h5>
                  {isEditMode && (
                    <Button
                      color="primary"
                      size="sm"
                      className="mb-3"
                    >
                      <label htmlFor="document-upload" style={{ cursor: 'pointer', margin: 0 }}>
                        <i className="fas fa-upload me-2"></i>Upload
                      </label>
                      <input
                        id="document-upload"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx"
                        onChange={handleDocumentChange}
                        style={{ display: 'none' }}
                      />
                    </Button>
                  )}
                </div>

                {formData.documents.length > 0 ? (
                  <ListGroup>
                    {formData.documents.map((doc, index) => (
                      <ListGroupItem key={index}>
                        <Media>
                          <i className={`fas ${doc.type === 'application/pdf' ? 'fa-file-pdf' : 'fa-file-word'} fa-2x me-3 text-primary`}></i>
                          <Media body>
                            <h6 className="mt-0">{doc.name}</h6>
                            <small className="text-muted">{doc.type}</small>
                          </Media>
                          {isEditMode && (
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                documents: prev.documents.filter((_, i) => i !== index)
                              }))}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          )}
                        </Media>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="text-muted">No documents uploaded</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {isEditMode && (
          <div className="d-flex justify-content-end mt-4">
            <Button
              color="success"
              className="me-3"
              onClick={handleUpdate}
            >
              <i className="fas fa-save me-2"></i>Save Changes
            </Button>
            <Button
              color="secondary"
              onClick={handleCancel}
            >
              <i className="fas fa-times me-2"></i>Cancel
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default SkillsTab