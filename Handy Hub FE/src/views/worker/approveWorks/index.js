// src/views/worker/WorkerApproveWork.js
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import PendingTasksTab from '../approveWorks/PendingTasksTab'
import ApprovedTasksTab from '../approveWorks/ApprovedTasksTab'
import '~@fortawesome/fontawesome-free/css/all.min.css'

const WorkerApproveWork = () => {
  const [activeTab, setActiveTab] = useState('1')
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const sampleWorks = [
    {
      id: 1,
      title: "Office Renovation",
      description: "Complete interior renovation",
      address: "123 Business St, NY",
      price: 14500,
      status: "pending",
      dueDate: "2024-01-25",
      completion: 65
    },
    {
      id: 2,
      title: "HVAC Maintenance",
      description: "Monthly system check",
      address: "456 Park Ave, NY",
      price: 850,
      status: "approved",
      dueDate: "2024-01-15",
      completion: 100
    },
    {
      id: 3,
      title: "HVAC Maintenance",
      description: "Monthly system check",
      address: "456 Park Ave, NY",
      price: 850,
      status: "approved",
      dueDate: "2024-01-15",
      completion: 100
    },
    {
      id: 1,
      title: "Office Renovation",
      description: "Complete interior renovation",
      address: "123 Business St, NY",
      price: 14500,
      status: "pending",
      dueDate: "2024-01-25",
      completion: 65
    }
  ]

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setWorks(sampleWorks)
      } catch (err) {
        setError('Failed to load works')
      } finally {
        setLoading(false)
      }
    }
    fetchWorks()
  }, [])

  if (loading) return <div className="p-5">Loading...</div>
  if (error) return <div className="p-5 text-danger">{error}</div>

  return (
    <Container fluid className="py-4">
      <Row>
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

        <Col md={9}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <PendingTasksTab works={works} />
            </TabPane>
            <TabPane tabId="2">
              <ApprovedTasksTab works={works} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  )
}

export default WorkerApproveWork