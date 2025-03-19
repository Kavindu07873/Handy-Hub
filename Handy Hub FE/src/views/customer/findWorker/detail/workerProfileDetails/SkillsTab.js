import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Media,
} from 'reactstrap';
import '~@fortawesome/fontawesome-free/css/all.min.css';

const SkillsTab = ({ userData }) => {
  // Initialize form data with user-provided data
  const [formData] = React.useState({
    education: userData.education || '',
    professionalSkills: userData.professionalSkills?.map((skill) => ({
      text: skill.text,
      image: skill.image || '',
    })) || [],
    softSkills: userData.softSkills || '',
    documents: userData.documents || [],
  });

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
                </div>
                <div className="text-muted">
                  {formData.education.split('\n').map((line, index) => (
                    <div key={index}>{line || '-'}</div>
                  ))}
                </div>
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
                </div>
                {formData.professionalSkills.map((skill, index) => (
                  <Media key={index} className="mb-3">
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
                </div>
                <div className="text-muted">
                  {formData.softSkills.split('\n').map((line, index) => (
                    <div key={index}>{line || '-'}</div>
                  ))}
                </div>
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
                </div>
                {formData.documents.length > 0 ? (
                  <ListGroup>
                    {formData.documents.map((doc, index) => (
                      <ListGroupItem key={index}>
                        <Media>
                          <i
                            className={`fas ${
                              doc.type === 'application/pdf'
                                ? 'fa-file-pdf'
                                : 'fa-file-word'
                            } fa-2x me-3 text-primary`}
                          ></i>
                          <Media body>
                            <h6 className="mt-0">{doc.name}</h6>
                            <small className="text-muted">{doc.type}</small>
                          </Media>
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
      </CardBody>
    </Card>
  );
};

export default SkillsTab;