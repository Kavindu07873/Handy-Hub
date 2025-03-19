import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardText, Badge, Button, Input, Label } from 'reactstrap';
import Flatpickr from 'react-flatpickr'; // Date range picker library
import '@styles/react/libs/flatpickr/flatpickr.scss'; // Import styles for the date picker

const UserInfoTab = ({ userData }) => {
  // ** State for Profile Image
  const [formData, setFormData] = React.useState({ ...userData }); // Manage form data dynamically
  const [hireData, setHireData] = React.useState({
    description: '',
    dateRange: [],
  });


  // ** Handle Hire Worker
  const handleHireWorker = () => {
    if (!hireData.description.trim()) {
      alert('Please provide a description.');
      return;
    }
    if (hireData.dateRange.length !== 2) {
      alert('Please select a valid date range.');
      return;
    }

    // Simulate hiring submission
    console.log('Hiring Request Submitted:', {
      workerId: userData.id,
      description: hireData.description,
      dateRange: hireData.dateRange,
    });
    alert('Hiring request submitted successfully!');
  };

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <Row className="align-items-center">
          {/* User Info */}
          <Col md="9">
            <div className="text-muted">
              {/* Hire Worker Section */}
              <div className="mt-4">
                <h5>Hire This Worker</h5>
                <Row>
                  {/* Description */}
                  <Col sm="12" className="mb-2">
                    <Label className="form-label" for="hire-description">
                      <strong>Description:</strong>
                    </Label>
                    <Input
                      id="hire-description"
                      type="textarea"
                      placeholder="Enter a description..."
                      value={hireData.description}
                      onChange={(e) =>
                        setHireData((prev) => ({ ...prev, description: e.target.value }))
                      }
                    />
                  </Col>

                  {/* Date Range Picker */}
                  <Col sm="12" className="mb-2">
                    <Label className="form-label" for="hire-date-range">
                      <strong>Select Date Range:</strong>
                    </Label>
                    <Flatpickr
                      id="hire-date-range"
                      value={hireData.dateRange}
                      options={{
                        mode: 'range',
                        dateFormat: 'Y-m-d',
                      }}
                      onChange={(selectedDates) =>
                        setHireData((prev) => ({ ...prev, dateRange: selectedDates }))
                      }
                      className="form-control"
                    />
                  </Col>
                </Row>

                {/* Hire Button */}
                <div className="d-flex justify-content-end mt-3">
                  <Button color="success" size="sm" onClick={handleHireWorker}>
                    Hire Worker
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserInfoTab;