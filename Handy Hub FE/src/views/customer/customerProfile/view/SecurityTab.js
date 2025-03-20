// ** React Imports
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Alert,
  Input,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from 'reactstrap';

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle';

// ** Third Party Components
import * as yup from 'yup';
import 'cleave.js/dist/addons/cleave-phone.us';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

// Validation Schema
const SignupSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref('email'), null], 'Emails must match')
    .required('Confirm email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

// Default Form Values
const defaultValues = {
  currentPassword: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
};

const SecurityTab = () => {
  // ** Hooks
  const [sendResetEmail, setSendResetEmail] = useState(false); // State for checkbox

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) });

  // Handle Change Password API Call
  const handleChangePassword = async (data) => {
    try {
      let payload = {};

      if (sendResetEmail) {
        // If the checkbox is checked, send only the email for password reset
        payload = {
          email: data.email,
        };
      } else {
        // Otherwise, send the full payload with current and new password
        payload = {
          currentPassword: data.currentPassword,
          email: data.email,
          newPassword: data.password,
        };
      }

      console.log('Sending payload:', payload);

      // Send the POST request to the backend API
      const response = await fetch(
        sendResetEmail ? 'http://localhost:8080/customer/resetPasswordEmail' : 'http://localhost:8080/customer/profile/passwordReset',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in the headers
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reset password.');
      }

      const result = await response.json();
      console.log('Password reset successfully:', result);
      alert(sendResetEmail ? 'Reset password link sent to your email!' : 'Password updated successfully!');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert(`Error: ${error.message || 'Failed to reset password.'}`);
    }
  };

  return (
    <Fragment>
      {/* Main Card */}
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Change Password</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(handleChangePassword)}>
            {/* Password Requirements Alert */}
            <Alert color="warning" className="mb-2">
              <h4 className="alert-heading">Ensure that these requirements are met:</h4>
              <div className="alert-body">
                - Minimum 8 characters long
                <br />
                - At least one uppercase letter
                <br />
                - At least one symbol
              </div>
            </Alert>

            {/* Email Fields */}
            <Row>
              {/* Email */}
              <Col md={6} className="mb-2">
                <Controller
                  id="email"
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      label="Email"
                      htmlFor="email"
                      placeholder="Enter your email"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
              </Col>

              {/* Confirm Email */}
              <Col md={6} className="mb-2">
                <Controller
                  id="confirmEmail"
                  name="confirmEmail"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      label="Confirm Email"
                      htmlFor="confirmEmail"
                      placeholder="Confirm your email"
                      invalid={errors.confirmEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.confirmEmail && <FormFeedback>{errors.confirmEmail.message}</FormFeedback>}
              </Col>
            </Row>

            {/* Current Password Field */}
            {!sendResetEmail && (
              <Row>
                <Col md={6} className="mb-2">
                  <Controller
                    id="currentPassword"
                    name="currentPassword"
                    control={control}
                    render={({ field }) => (
                      <InputPasswordToggle
                        label="Current Password"
                        htmlFor="currentPassword"
                        className="input-group-merge"
                        invalid={errors.currentPassword && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.currentPassword && <FormFeedback>{errors.currentPassword.message}</FormFeedback>}
                </Col>
              </Row>
            )}

            {/* New Password Fields */}
            {!sendResetEmail && (
              <Row>
                {/* New Password */}
                <Col md={6} className="mb-2">
                  <Controller
                    id="password"
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <InputPasswordToggle
                        label="New Password"
                        htmlFor="password"
                        className="input-group-merge"
                        invalid={errors.password && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                </Col>

                {/* Confirm New Password */}
                <Col md={6} className="mb-2">
                  <Controller
                    id="confirmPassword"
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <InputPasswordToggle
                        label="Confirm New Password"
                        htmlFor="confirmPassword"
                        className="input-group-merge"
                        invalid={errors.confirmPassword && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.confirmPassword && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
                </Col>
              </Row>
            )}

            {/* Checkbox for Reset Password Link */}
            <Row>
              <Col xs={12} className="mb-2">
                <Controller
                  id="sendResetEmail"
                  name="sendResetEmail"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="form-check">
                      <Input
                        type="checkbox"
                        id="sendResetEmail"
                        checked={sendResetEmail}
                        onChange={(e) => {
                          field.onChange(e);
                          setSendResetEmail(e.target.checked);
                        }}
                      />
                      <label htmlFor="sendResetEmail" className="form-check-label">
                        Send reset password link to my email
                      </label>
                    </div>
                  )}
                />
              </Col>
            </Row>

            {/* Submit Button */}
            <Row>
              <Col xs={12}>
                <Button type="submit" color="primary" block>
                  {sendResetEmail ? 'Send Reset Link' : 'Change Password'}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default SecurityTab;