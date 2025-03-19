// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import UserTabs from './UserTabs'
import Breadcrumbs from '@components/breadcrumbs'
import UserInfoTab from './UserInfoTab'
import SkillsTab from './SkillsTab'
import WorkerInfoTab from './WorkerInfoTab'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const UserView = () => {
  // ** State for active tab
  const [activeTab, setActiveTab] = useState('1')

  const toggleTab = tab => setActiveTab(tab)


  const sampleUser = {
    id: 1,
    image: 'https://t3.ftcdn.net/jpg/02/43/12/34/240_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    company: 'Tech Corp',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY',
    timezone: 'GMT-05:00',
    education: "Bachelor of Science in Computer Engineering\nStanford University (2015-2019)",
    professionalSkills: [
      { text: "Cloud Architecture", image: "https://th.bing.com/th/id/OIP.rN-Bp55BoHTPjf3X5M06ogHaEK?w=259&h=180&c=7&r=0&o=5&pid=1.7" },
      { text: "React Development", image: "https://th.bing.com/th/id/OIP.tersfy3S4hedk1soOH22hAAAAA?w=327&h=180&c=7&r=0&o=5&pid=1.7" }
    ],
    softSkills: "Team leadership\nCommunication\nProblem-solving",
    documents: [
      { name: "resume.pdf", type: "application/pdf", url: "..." },
      { name: "portfolio.docx", type: "application/msword", url: "..." }
    ],
    worker: {
      id: 1,
      username: 'worker_john',
      lastName: 'Doe',
      email: 'worker.john@example.com',
      mobileNumber: '+1 (555) 987-6543',
      imageUrl: 'data:image/jpeg;base64,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',
      status: 'Active',
      userRole: 'Worker',
      workerType: 'Plumber',
      gender: 'Male',
      workerRank: 'Senior',
      workerInformation: {
        username: 'worker_info_john',
        lastName: 'Doe Info',
        email: 'worker_info.john@example.com',
        mobileNumber: '+1 (555) 123-4567',
        status: 'Active',
        userRole: 'Worker'
      }
    }
  }

  return (
    <Fragment>
      {/*<Breadcrumbs title="User Profile" data={[{ title: 'Users' }, { title: 'User View' }]} />*/}

      <Row>
        <Col xs={12}>
          <UserTabs activeTab={activeTab} toggleTab={toggleTab} />
           Tab Content
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <UserInfoTab userData={sampleUser} />
            </TabPane>
            <TabPane tabId="3">
              <SkillsTab userData={sampleUser} />
            </TabPane>
            <TabPane tabId="5">
              <WorkerInfoTab workerData={sampleUser.worker} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  )
}

export default UserView
