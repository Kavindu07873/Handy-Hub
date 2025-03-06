import React from 'react'
import { Card, CardBody, CardTitle, CardText, Badge } from 'reactstrap'

const PlanCard = ({ plan }) => {
  return (
    <Card className='mb-2 shadow-sm'>
      <CardBody>
        <CardTitle tag='h4' className='mb-2'>Subscription Plan</CardTitle>
        <CardText>
          <strong>Plan:</strong> {plan.name} <br />
          <strong>Expiry Date:</strong> {plan.expiry} <br />
          <strong>Status:</strong>
          <Badge color={plan.status === 'Active' ? 'success' : 'danger'} className='ms-1'>
            {plan.status}
          </Badge>
        </CardText>
      </CardBody>
    </Card>
  )
}

// Default Props (if no data is passed)
PlanCard.defaultProps = {
  plan: {
    name: 'Premium',
    expiry: '2024-12-31',
    status: 'Active'
  }
}

export default PlanCard
