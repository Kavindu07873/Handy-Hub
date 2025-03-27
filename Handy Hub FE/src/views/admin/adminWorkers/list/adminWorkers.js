import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardBody, CardTitle, CardText, Row, Col, Button } from "reactstrap"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { User, UserCheck, UserPlus, UserX } from "react-feather"
import Table from "@src/views/admin/adminWorkers/list/Table"
import { Link } from "react-router-dom"

const AdminWorkers = () => {
  // State to hold the worker counts fetched from the API
  const [workerCounts, setWorkerCounts] = useState({
    totalWorkers: 0,
    electrician: 0,
    plumber: 0,
    meshanBass: 0,
    painter: 0,
    laborer: 0,
    trainee: 0,
  })

  // Function to fetch worker counts from the API
  const fetchWorkerCounts = async () => {
    try {
      const response = await fetch("http://localhost:8080/worker/workerCount")
      if (!response.ok) {
        throw new Error("Failed to fetch worker counts")
      }
      const data = await response.json()
      // console.log("data  : ",data.body)
      setWorkerCounts(data.body) // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching worker counts:", error)
    }
  }

  // Call the API when the component mounts
  useEffect(() => {
    fetchWorkerCounts()
  }, [])

  return (
    <div className="app-user-list">
      <Row>
        {/* Total Workers */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Workers"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{workerCounts.totalWorkers.toLocaleString()}</h3>}
          />
        </Col>

        {/* Electrician */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="ELECTRICIAN"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{workerCounts.electrician.toLocaleString()}</h3>}
          />
        </Col>

        {/* Plumber */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="PLUMBER"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{workerCounts.plumber.toLocaleString()}</h3>}
          />
        </Col>

        {/* Meshan Bass */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="MESHAN_BASS"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{workerCounts.meshanBass.toLocaleString()}</h3>}
          />
        </Col>

        {/* Painter */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="PAINTER"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{workerCounts.painter.toLocaleString()}</h3>}
          />
        </Col>

        {/* Laborer */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="LABORER"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{workerCounts.laborer.toLocaleString()}</h3>}
          />
        </Col>

        {/* Trainee */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="TRAINEE"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{workerCounts.trainee.toLocaleString()}</h3>}
          />
        </Col>
      </Row>

      {/* Worker List Table */}
      <Table />

      {/* Example Button (Commented Out) */}
      {/* <Button tag={Link} to="/second-page" color="primary" block>
        Sign in
      </Button> */}
    </div>
  )
}

export default AdminWorkers