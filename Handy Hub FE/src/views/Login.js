// ** React Imports
import { useSkin } from "@hooks/useSkin"
import { Link } from "react-router-dom"
// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub, GitMerge } from "react-feather"
// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle"
// ** Reactstrap Imports
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
// ** import Google icon
import { FaGoogle } from "react-icons/fa";
<FaGoogle color="#4285F4" size={32} />
// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg"
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg"
// ** Styles
import "@styles/react/pages/page-authentication.scss"
import React, { useState } from "react"
import { signInWithGoogle} from "@configs/firebaseConfig"
import { loginWithOAuth} from "@configs/AuthConfig"
// import axios from "axios"
// eslint-disable-next-line no-duplicate-imports
import {useNavigate} from "react-router-dom"




const Login = () => {
  const { skin } = useSkin()

  const source = skin === "dark" ? illustrationsDark : illustrationsLight

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  // basic login
  const handleBasicLogin = async (e) => {
    e.preventDefault()
    console.log("username  ",username)
    console.log("password  ",password)
    const user = await loginWithOAuth(username, password)
    if (user) {
      alert("Login successful!")
      navigate("/home")
      console.log("user.role  : ",user.role)
    } else {
      alert("Invalid credentials")
    }
  }

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle()
      if (loggedInUser) {
        setUser(loggedInUser)
        navigate("/home")
        console.log("user.role  : ",loggedInUser.role)
        console.log("User Logged In: ", loggedInUser)
      }
    } catch (error) {
      console.error("Google Sign-In Error: ", error)
    }
  }
  // const handleLogout = async () => {
  //   await logout();
  //   setUser(null);
  // };


  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">Handy Hub</h2>
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
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to Handy Hub! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  placeholder="john@example.com"
                  autoFocus
                  value={username} onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              <Button color="primary" block onClick={handleBasicLogin}>
                Sign in
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">New on 1234 our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">

              {/*<Button tag={Link} to="/" color="github">*/}
              {/*  <GitHub size={14} />*/}
              {/*</Button>*/}
              <Button className="d-flex align-items-center justify-content-center" color="danger" block onClick={handleGoogleLogin}>
                <FaGoogle size={18} className="me-2" />
                <span>Sign in with Google</span>
              </Button >
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
