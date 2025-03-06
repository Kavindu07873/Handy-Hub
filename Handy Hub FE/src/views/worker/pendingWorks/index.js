import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ApproveWorkTab from '../approveWorks/ApprovedTasksTab'

const WorkerApproveWork = () => {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const sampleWorks = [
    {
      id: 1,
      title: "Office Renovation",
      description: "Complete interior renovation of 5th floor office space",
      address: "123 Business St, New York, NY",
      price: 14500,
      status: "pending",
      dueDate: "2024-01-25",
      completion: 65,
      instructions: "Use eco-friendly materials where possible"
    },
    {
      id: 2,
      title: "HVAC Maintenance",
      description: "Monthly HVAC system check and maintenance",
      address: "456 Park Ave, New York, NY",
      price: 850,
      status: "approved",
      dueDate: "2024-01-15",
      completion: 100
    }
  ]

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true)
      try {
        // Simulate API call with 1s delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setWorks(sampleWorks)
      } catch (err) {
        setError('Failed to load works')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchWorks()
  }, [])

  if (loading) return <div className="p-5">Loading works...</div>
  if (error) return <div className="p-5 text-danger">{error}</div>

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <ApproveWorkTab works={works} />
        </Col>
      </Row>
    </Container>
  )
}

export default WorkerApproveWork