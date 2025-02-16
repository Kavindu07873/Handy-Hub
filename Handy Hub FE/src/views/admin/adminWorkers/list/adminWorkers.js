import { Card, CardHeader, CardBody, CardTitle, CardText, Row, Col, Button } from "reactstrap"
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"
import { User, UserCheck, UserPlus, UserX } from "react-feather"
import Table from "@src/views/admin/adminWorkers/list/Table"
import { Link } from "react-router-dom"
import React from "react"

const AdminWorkers = () => {
  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>Create Awesome 🙌</CardTitle>
    //   </CardHeader>
    //   <CardBody>
    //     <CardText>This is your Third page.</CardText>
    //     <CardText>
    //       Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin.
    //       Carrot cake dragée chupa chups jujubes. Macaroon liquorice cookie
    //       wafer tart marzipan bonbon. Gingerbread jelly-o dragée chocolate.
    //     </CardText>
    //   </CardBody>
    // </Card>
    <div className='app-user-list'>
      <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Total Users'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>21,459</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='Paid Users'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>4,567</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Active Users'
            icon={<UserCheck size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>19,860</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='Pending Users'
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>237</h3>}
          />
        </Col>
      </Row>
      <Table />
      <Button tag={Link} to="/second-page" color="primary" block>
        Sign in
      </Button>
    </div>
  )
}

export default AdminWorkers
