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
      {/*<NavItem>*/}
      {/*  <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => toggleTab('2')}>*/}
      {/*    Security*/}
      {/*  </NavLink>*/}
      {/*</NavItem>*/}
      {/*<NavItem>*/}
      {/*  <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => toggleTab('3')}>*/}
      {/*    SkillsTab*/}
      {/*  </NavLink>*/}
      {/*</NavItem>*/}
      {/*<NavItem>*/}
      {/*  <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => toggleTab('4')}>*/}
      {/*    Settings*/}
      {/*  </NavLink>*/}
      {/*</NavItem>*/}
      {/*<NavItem>*/}
      {/*  <NavItem>*/}
      {/*    <NavLink className={classnames({ active: activeTab === '5' })} onClick={() => toggleTab('5')}>*/}
      {/*      Worker Info*/}
      {/*    </NavLink>*/}
      {/*  </NavItem>*/}
      {/*</NavItem>*/}
    </Nav>
  )
}

export default UserTabs
