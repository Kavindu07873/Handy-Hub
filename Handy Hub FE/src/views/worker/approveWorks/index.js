// src/views/worker/WorkerApproveWork.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import PendingTasksTab from '../approveWorks/PendingTasksTab';
import ApprovedTasksTab from '../approveWorks/ApprovedTasksTab';
import '~@fortawesome/fontawesome-free/css/all.min.css';

const WorkerApproveWork = () => {
  const [activeTab, setActiveTab] = useState('1'); // Active tab state
  const [works, setWorks] = useState([]); // State to store fetched works
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch works from the backend API
  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/worker/involveTask', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWorks(data); // Assuming the API returns an array of works
      } catch (err) {
        console.error('Error fetching works:', err);
        setError('Failed to load works. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorks(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Filter works based on status for each tab
  const pendingWorks = works.filter((work) => work.status === 'pending');
  const approvedWorks = works.filter((work) => work.status === 'approved');

  // Handle loading and error states
  if (loading) return <div className="p-5">Loading...</div>;
  if (error) return <div className="p-5 text-danger">{error}</div>;

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Sidebar Navigation */}
        <Col md={3}>
          <Nav vertical pills>
            <NavItem>
              <NavLink
                active={activeTab === '1'}
                onClick={() => setActiveTab('1')}
              >
                <i className="fas fa-clock me-2"></i>Pending Tasks
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={activeTab === '2'}
                onClick={() => setActiveTab('2')}
              >
                <i className="fas fa-check-double me-2"></i>Approved Tasks
              </NavLink>
            </NavItem>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <TabContent activeTab={activeTab}>
            {/* Pending Tasks Tab */}
            <TabPane tabId="1">
              <PendingTasksTab works={pendingWorks} />
            </TabPane>

            {/* Approved Tasks Tab */}
            <TabPane tabId="2">
              <ApprovedTasksTab works={approvedWorks} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default WorkerApproveWork;