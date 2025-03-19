import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

const UserTabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav tabs>
      <NavItem>
        <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => toggleTab('1')}>
          User Info
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => toggleTab('3')}>
          SkillsTab
        </NavLink>
      </NavItem>
      <NavItem>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === '5' })} onClick={() => toggleTab('5')}>
            Worker Info
          </NavLink>
        </NavItem>
      </NavItem>
    </Nav>
  )
}

export default UserTabs
