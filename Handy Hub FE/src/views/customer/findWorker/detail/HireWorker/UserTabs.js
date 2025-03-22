import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

const UserTabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => toggleTab('1')}>
          Hire Worker
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default UserTabs
