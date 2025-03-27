import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardBody, CardTitle, CardText, Col, Row } from "reactstrap"
import Table from './Table'
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { User, UserCheck, UserPlus, UserX } from "react-feather"

const SecondPage = () => {
  // State to hold the customer counts fetched from the API
  const [customerCounts, setCustomerCounts] = useState({
    totalCustomers: 0,
    newbieCustomers: 0,
    bronzeCustomers: 0,
    silverCustomers: 0,
    goldCustomers: 0,
    platinumCustomers: 0,
    diamondCustomers: 0,
  })

  // Function to fetch customer counts from the API
  const fetchCustomerCounts = async () => {
    try {
      const response = await fetch("http://localhost:8080/customer/customerCount")
      if (!response.ok) {
        throw new Error("Failed to fetch customer counts")
      }
      const data = await response.json()
      setCustomerCounts(data.body) // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching customer counts:", error)
    }
  }

  // Call the API when the component mounts
  useEffect(() => {
    fetchCustomerCounts()
  }, [])

  return (
    <div className="app-user-list">
      <Row>
        {/* Total Customers */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Customer"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{customerCounts.totalCustomers.toLocaleString()}</h3>}
          />
        </Col>

        {/* Newbie Customers */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="NEWBIE Customer"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{customerCounts.newbieCustomers.toLocaleString()}</h3>}
          />
        </Col>

        {/* Bronze Customers */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="BRONZE Customer"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{customerCounts.bronzeCustomers.toLocaleString()}</h3>}
          />
        </Col>

        {/* Silver Customers */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="SILVER Customer"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{customerCounts.silverCustomers.toLocaleString()}</h3>}
          />
        </Col>

        {/* Gold Customers */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="GOLD Customer"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{customerCounts.goldCustomers.toLocaleString()}</h3>}
          />
        </Col>

        {/* Platinum Customers */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="PLATINUM Customer"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{customerCounts.platinumCustomers.toLocaleString()}</h3>}
          />
        </Col>

        {/* Diamond Customers */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="DIAMOND Customer"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{customerCounts.diamondCustomers.toLocaleString()}</h3>}
          />
        </Col>
      </Row>

      {/* Customer List Table */}
      <Table />
    </div>
  )
}

export default SecondPage