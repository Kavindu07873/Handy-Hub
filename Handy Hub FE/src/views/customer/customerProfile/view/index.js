// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import UserTabs from './UserTabs'
import Breadcrumbs from '@components/breadcrumbs'
import UserInfoTab from './UserInfoTab'
import SecurityTab from './SecurityTab'
import ActivityTab from './ActivityTab'
import SettingsTab from './SettingsTab'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const UserView = () => {
  // ** State for active tab
  const [activeTab, setActiveTab] = useState('1')

  // ** State for user data and loading state
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ** Toggle Tab Function
  const toggleTab = (tab) => setActiveTab(tab)

  // ** Fetch User Data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:8080/customer/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the token from localStorage
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to fetch user data.')
        }

        const data = await response.json()

        // Extract the 'body' object from the API response
        const userDataFromAPI = data.body

        // Validate the response structure
        if (!userDataFromAPI) {
          throw new Error('Invalid API response: Missing "body" field.')
        }

        setUserData(userDataFromAPI) // Set the fetched user data
      } catch (err) {
        setError(err.message) // Handle errors
      } finally {
        setLoading(false) // Stop loading
      }
    }

    fetchUserData()
  }, [])

  // ** Render Loading State
  if (loading) {
    return <div>Loading user data...</div>
  }

  // ** Render Error State
  if (error) {
    return <div>Error: {error}</div>
  }

  // ** Render Component with Fetched Data
  return (
    <Fragment>
      <Breadcrumbs title="User Profile" data={[{ title: 'Users' }, { title: 'User View' }]} />

      <Row>
        <Col xs={12}>
          {/* Tabs Navigation */}
          <UserTabs activeTab={activeTab} toggleTab={toggleTab} />

          {/* Tab Content */}
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <UserInfoTab userData={userData} />
            </TabPane>
            <TabPane tabId="2">
              <SecurityTab userId={userData?.id} />
            </TabPane>
            <TabPane tabId="3">
              <ActivityTab userId={userData?.id} />
            </TabPane>
            <TabPane tabId="4">
              <SettingsTab userId={userData?.id} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  )
}

export default UserView