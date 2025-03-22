import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { Row, Col, Card, CardBody, CardTitle, CardText, Badge, Button, Input, Label } from 'reactstrap';
import Flatpickr from 'react-flatpickr'; // Date range picker library
import '@styles/react/libs/flatpickr/flatpickr.scss'; // Import styles for the date picker

const UserInfoTab = ({ userData }) => {
  // ** Extract workerId from URL using useParams
  const { id: workerIdFromUrl } = useParams(); // Extract the `id` from the URL

  // ** State for Profile Image
  const [formData, setFormData] = React.useState({ ...userData }); // Manage form data dynamically
  const [hireData, setHireData] = React.useState({
    description: '',
    address: '', // Field for address
    location: '', // Field for location
    comment: '', // Field for comment
    dateRange: [],
    quantity: '', // New field for people quantity
  });

  // ** Handle Hire Worker
  const handleHireWorker = async () => {
    // Validate description
    if (!hireData.description.trim()) {
      alert('Please provide a description.');
      return;
    }

    // Validate address
    if (!hireData.address.trim()) {
      alert('Please provide an address.');
      return;
    }

    // Validate location
    if (!hireData.location.trim()) {
      alert('Please provide a location.');
      return;
    }

    // Validate quantity
    if (!hireData.quantity || isNaN(hireData.quantity) || hireData.quantity <= 0) {
      alert('Please provide a valid positive number for the quantity of people.');
      return;
    }

    // Validate date range
    if (hireData.dateRange.length !== 2) {
      alert('Please select a valid date range.');
      return;
    }

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    // Prepare the payload for the API request
    const hiringRequest = {
      workerId: workerIdFromUrl, // Use the workerId extracted from the URL
      description: hireData.description,
      address: hireData.address, // Include address
      location: hireData.location, // Include location
      comment: hireData.comment, // Include comment
      dateRange: hireData.dateRange.map((date) => date.toISOString().split('T')[0]), // Format dates as YYYY-MM-DD
      quantity: parseInt(hireData.quantity, 10), // Include people quantity as an integer
    };

    try {
      // Send the POST request to the backend API with the Authorization header
      const response = await fetch('http://localhost:8080/work/hire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(hiringRequest),
      });

      // Check if the request was successful
      if (response.ok) {
        const result = await response.json();
        console.log('Hiring Request Submitted:', result);
        alert('Hiring request submitted successfully!');
      } else {
        // Handle errors from the server
        const errorData = await response.json();
        console.error('Error submitting hiring request:', errorData);
        alert(`Error: ${errorData.message || 'Failed to submit hiring request.'}`);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Network error:', error);
      alert('An error occurred while submitting the hiring request. Please try again later.');
    }
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

                  {/* Address */}
                  <Col sm="12" className="mb-2">
                    <Label className="form-label" for="hire-address">
                      <strong>Address:</strong>
                    </Label>
                    <Input
                      id="hire-address"
                      type="text"
                      placeholder="Enter the address..."
                      value={hireData.address}
                      onChange={(e) =>
                        setHireData((prev) => ({ ...prev, address: e.target.value }))
                      }
                    />
                  </Col>

                  {/* Location */}
                  <Col sm="12" className="mb-2">
                    <Label className="form-label" for="hire-location">
                      <strong>Location:</strong>
                    </Label>
                    <Input
                      id="hire-location"
                      type="text"
                      placeholder="Enter the location..."
                      value={hireData.location}
                      onChange={(e) =>
                        setHireData((prev) => ({ ...prev, location: e.target.value }))
                      }
                    />
                  </Col>

                  {/* People Quantity */}
                  <Col sm="12" className="mb-2">
                    <Label className="form-label" for="hire-quantity">
                      <strong>Number of People:</strong>
                    </Label>
                    <Input
                      id="hire-quantity"
                      type="number"
                      placeholder="Enter the number of people..."
                      value={hireData.quantity}
                      onChange={(e) =>
                        setHireData((prev) => ({ ...prev, quantity: e.target.value }))
                      }
                      min="1" // Ensure the minimum value is 1
                    />
                  </Col>

                  {/* Comment */}
                  <Col sm="12" className="mb-2">
                    <Label className="form-label" for="hire-comment">
                      <strong>Comment:</strong>
                    </Label>
                    <Input
                      id="hire-comment"
                      type="textarea"
                      placeholder="Enter a comment..."
                      value={hireData.comment}
                      onChange={(e) =>
                        setHireData((prev) => ({ ...prev, comment: e.target.value }))
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