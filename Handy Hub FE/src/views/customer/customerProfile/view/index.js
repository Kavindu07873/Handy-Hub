// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Alert, Button, Card, CardBody, FormGroup, Label, Input } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserView = () => {
  // ** Hooks
  const { id } = useParams()

  // ** Local State
  const [user, setUser] = useState(null)
  const [workers, setWorkers] = useState([])
  const [totalWorkers, setTotalWorkers] = useState(0)
  const [active, setActive] = useState('1')
  const [image, setImage] = useState('/images/avatars/avatar-1.png') // Default avatar

  // Fetch user details
  const fetchUserData = async () => {
    try {
      const userData = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
        avatar: "/images/avatars/avatar-1.png",
        status: "Active",
        company: "TechCorp",
        phone: "+1234567890",
        address: "123 Main St, Springfield, IL"
      }
      setUser(userData)
      setImage(userData.avatar)

      const workersData = [
        { id: 1, name: "Alice Smith", role: "Developer", status: "Active" },
        { id: 2, name: "Bob Johnson", role: "Designer", status: "Inactive" },
        { id: 3, name: "Charlie Brown", role: "Manager", status: "Active" }
      ]
      setWorkers(workersData)
      setTotalWorkers(workersData.length)
    } catch (error) {
      console.error("Error fetching user or customer details:", error)
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchUserData()
  }, [id])

  // Handle Profile Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl) // Set preview image
    }
  }

  // Toggle tab handler
  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return user ? (
    <div className='app-user-view'>
      <Row>
        {/* Left Column: User Info Card and Profile Picture */}
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <Card className='mb-2'>
            <CardBody className='text-center'>
              <div className='mb-2'>
                <img
                  src={image}
                  alt='Profile'
                  className='rounded-circle'
                  width='120'
                  height='120'
                />
              </div>
              <FormGroup>
                <Label for='upload'>Upload Profile Picture</Label>
                <Input type='file' id='upload' accept='image/*' onChange={handleImageUpload} />
              </FormGroup>
            </CardBody>
          </Card>
          <UserInfoCard selectedUser={user} />
          <PlanCard />
        </Col>

        {/* Right Column: Tabs */}
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} workers={workers} totalWorkers={totalWorkers} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}

export default UserView
