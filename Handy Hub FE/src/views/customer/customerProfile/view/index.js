// ** React Imports
import { Fragment, useState } from 'react'

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

  const toggleTab = tab => setActiveTab(tab)

  // ** Sample User Data
  const sampleUser = {
    image: 'https://t3.ftcdn.net/jpg/02/43/12/34/240_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg', // Replace with actual image URL
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    company: 'Tech Corp',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY',
    timezone: 'GMT-05:00'
  }


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
              <UserInfoTab userData={sampleUser} />
            </TabPane>
            <TabPane tabId="2">
              <SecurityTab userId={sampleUser.id} />
            </TabPane>
            <TabPane tabId="3">
              <ActivityTab userId={sampleUser.id} />
            </TabPane>
            <TabPane tabId="4">
              <SettingsTab userId={sampleUser.id} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  )
}

export default UserView
