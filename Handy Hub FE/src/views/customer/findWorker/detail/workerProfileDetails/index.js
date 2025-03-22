// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap';

// ** Demo Components
import UserTabs from './UserTabs';
import UserInfoTab from './UserInfoTab';
import SkillsTab from './SkillsTab';
import WorkerInfoTab from './WorkerInfoTab';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-account-settings.scss';

const UserView = () => {
  // ** State for active tab
  const [activeTab, setActiveTab] = useState('1');
  const [userData, setUserData] = useState(null); // State to store fetched user data

  const sampleUser = {
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
    }
  }

  // Extract `id` from route parameters
  const { id } = useParams(); // Get `id` from the URL

  const toggleTab = tab => setActiveTab(tab);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/worker/profile/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the token from localStorage
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // Extract the `body` object from the API response
        const { body } = responseData;

        // Log the response data for debugging
        console.log('API Response:', responseData);

        // Set the fetched user data into state
        setUserData(body);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (id) {
      fetchUserData(); // Call the function to fetch user data only if `id` exists
    }
  }, [id]); // Add `id` as a dependency to re-fetch data if the `id` changes

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  console.log("Education:", userData.education);
  console.log("Soft Skills:", userData.softSkills);
  console.log("Professional Skills:", userData.professionalSkills);

  return (
    <Fragment>
      {/*<Breadcrumbs title="User Profile" data={[{ title: 'Users' }, { title: 'User View' }]} />*/}

      <Row>
        <Col xs={12}>
          <UserTabs activeTab={activeTab} toggleTab={toggleTab} />
          {/* Tab Content */}
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <UserInfoTab userData={userData} />
            </TabPane>
            <TabPane tabId="3">
              <SkillsTab userData={sampleUser} />
            </TabPane>
            <TabPane tabId="5">
              <WorkerInfoTab workerData={userData.worker} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UserView;