import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, Label, Input, Button } from 'reactstrap';

const UserInfoTab = ({ userData }) => {
  // ** State for Profile Image
  const [avatar, setAvatar] = React.useState(userData.image || '');
  const [isEditMode, setIsEditMode] = React.useState(false); // Toggle between view and edit modes
  const [formData, setFormData] = React.useState({ ...userData }); // Manage form data dynamically

  // ** Define Enums
  const genderOptions = ['MALE', 'FEMALE', 'NONE'];

  // ** Handle Image Upload
  const onChange = (e) => {
    const reader = new FileReader();
    const files = e.target.files;
    reader.onload = () => {
      setAvatar(reader.result);
      setFormData((prevData) => ({ ...prevData, image: reader.result }));
    };
    reader.readAsDataURL(files[0]);
  };

  // ** Handle Image Reset
  const handleImgReset = () => {
    setAvatar('');
    setFormData((prevData) => ({ ...prevData, image: '' }));
  };

  // ** Handle Form Field Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ** Handle Edit Mode
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  // ** Handle Update Mode
  const handleUpdateClick = async () => {
    try {
      // Prepare the payload to send to the backend
      const payload = {
        id: formData.id,
        email: formData.email,
        username: formData.username,
        address: formData.address,
        role: formData.role,
        lastName: formData.lastName,
        mobileNumber: formData.phone,
        gender: formData.gender,
        image: formData.image, // Base64 image string if uploaded
      };

      console.log('Updating data:', payload);

      // Send the POST request to the backend API
      const response = await fetch('http://localhost:8080/customer/profile/update', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in the headers
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user data.');
      }

      const result = await response.json();
      console.log('User data updated successfully:', result);

      // Switch back to view mode after successful update
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating data:', error);
      alert(`Error: ${error.message || 'Failed to update user data.'}`);
    }
  };

  return (
    <Card className="shadow-lg border-0 rounded">
      <CardBody>
        <Row className="align-items-center">
          {/* Profile Image */}
          <Col md="3" className="text-center">
            <img
              src={avatar || formData.image || 'https://via.placeholder.com/120'}
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
                    defaultValue={formData.email || ''}
                    onChange={handleInputChange} // Allow editing in edit mode
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Username */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="username">
                    <strong>Username:</strong>
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    defaultValue={formData.username || ''}
                    onChange={handleInputChange} // Allow editing in edit mode
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
                    type="text"
                    placeholder="Address"
                    defaultValue={formData.address || ''}
                    onChange={handleInputChange} // Allow editing in edit mode
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
                    type="text"
                    placeholder="Role"
                    defaultValue={formData.role || ''}
                    onChange={handleInputChange} // Allow editing in edit mode
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Last Name */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="lastName">
                    <strong>Last Name:</strong>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    defaultValue={formData.lastName || ''}
                    onChange={handleInputChange} // Allow editing in edit mode
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Mobile Number */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="mobileNumber">
                    <strong>Mobile Number:</strong>
                  </Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    placeholder="Mobile Number"
                    defaultValue={formData.phone || ''}
                    onChange={handleInputChange} // Allow editing in edit mode
                    readOnly={!isEditMode} // Read-only in view mode
                  />
                </Col>

                {/* Gender */}
                <Col sm="6" className="mb-1">
                  <Label className="form-label" for="gender">
                    <strong>Gender:</strong>
                  </Label>
                  <Input
                    id="gender"
                    name="gender"
                    type="select"
                    defaultValue={formData.gender || ''}
                    onChange={handleInputChange} // Allow editing in edit mode
                    disabled={!isEditMode} // Disabled in view mode
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </Input>
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
  );
};

export default UserInfoTab;