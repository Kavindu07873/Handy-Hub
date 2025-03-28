import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom" // Import useNavigate
import { useSkin } from "@hooks/useSkin"
import { Facebook, Twitter, Mail, GitHub } from "react-feather"
import InputPasswordToggle from "@components/input-password-toggle"
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button
} from "reactstrap"
import illustrationsLight from "@src/assets/images/pages/register-v2.svg"
import illustrationsDark from "@src/assets/images/pages/register-v2-dark.svg"
import "@styles/react/pages/page-authentication.scss"
import { FaGoogle } from "react-icons/fa"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { registerUserService } from "../utility/api/registerApi"

const Register = () => {
  // ** Hooks
  const { skin } = useSkin()
  const source = skin === "dark" ? illustrationsDark : illustrationsLight
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [gender, setGender] = useState("") // State for Gender
  const navigate = useNavigate() // Initialize useNavigate

  // Handle Sign Up
  const handleBasicSignUp = async (e) => {
    e.preventDefault()

    // Validate required fields
    if (!username) {
      return toast.warning("Please fill in the username", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }

    if (!email) {
      return toast.warning("Please fill in the email", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }

    if (!password) {
      return toast.warning("Please fill in the password", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }

    if (!role) {
      return toast.warning("Please select a role", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }

    if (!gender) {
      return toast.warning("Please select a gender", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }

    // Prepare the payload
    const obj = {
      username,
      email,
      role,
      password,
      gender // Include gender in the payload
    }

    try {
      const res = await registerUserService(obj)
      if (res) {
        console.log("Registration successful:", res)

        // Show success alert
        alert("Registration successful!")

        // // Show success toast notification
        // toast.success("Registration successful!", {
        //   position: "top-right",
        //   autoClose: 3000,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true
        // })

        // Redirect to the login page after 3 seconds
        setTimeout(() => {
          navigate("/login") // Navigate to the login page
        }, 3000)
      }
    } catch (error) {
      console.error("Error during registration:", error)
      toast.error("Registration failed. Please try again!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
  }

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            {/* SVG content omitted for brevity */}
          </svg>
          <h2 className="brand-text text-primary ms-1">Vuexy</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Adventure starts here 🚀
            </CardTitle>
            <CardText className="mb-2">
              Make your app management easy and fun!
            </CardText>
            <Form
              className="auth-register-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Username */}
              <div className="mb-1">
                <Label className="form-label" for="register-username">
                  Username
                </Label>
                <Input
                  type="text"
                  id="register-username"
                  placeholder="johndoe"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mb-1">
                <Label className="form-label" for="register-email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="register-email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mb-1">
                <Label className="form-label" for="register-password">
                  Password
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="register-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Role */}
              <div className="mb-1">
                <Label className="form-label" for="register-role">
                  Select Role
                </Label>
                <Input
                  type="select"
                  id="register-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="WORKER">WORKER</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </Input>
              </div>

              {/* Gender */}
              <div className="mb-1">
                <Label className="form-label" for="register-gender">
                  Select Gender
                </Label>
                <Input
                  type="select"
                  id="register-gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </Input>
              </div>

              {/* Terms and Conditions */}
              <div className="form-check mb-1">
                <Input type="checkbox" id="terms" />
                <Label className="form-check-label" for="terms">
                  I agree to
                  <a
                    className="ms-25"
                    href="/"
                    onClick={(e) => e.preventDefault()}
                  >
                    privacy policy & terms
                  </a>
                </Label>
              </div>

              {/* Sign Up Button */}
              <Button color="primary" block onClick={handleBasicSignUp}>
                Sign up
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to="/login">
                <span>Sign in instead</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button
                tag={Link}
                to="/"
                className="d-flex align-items-center justify-content-center"
                color="danger"
                block
              >
                <FaGoogle size={18} className="me-2" />
                <span>Sign in with Google</span>
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register