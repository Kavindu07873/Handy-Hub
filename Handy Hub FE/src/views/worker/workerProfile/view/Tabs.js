// import React from 'react'
// import { TabContent, TabPane, Nav, NavItem, NavLink, Badge, ListGroup, ListGroupItem } from 'reactstrap'
// import classnames from 'classnames'
//
// const UserTabs = ({ active, toggleTab, workers, totalWorkers }) => {
//   return (
//     <div>
//       {/* Tab Navigation */}
//       <Nav tabs className="mb-3">
//         <NavItem>
//           <NavLink
//             className={classnames({ active: active === '1' })}
//             onClick={() => toggleTab('1')}
//             style={{ cursor: 'pointer' }}
//           >
//             Workers <Badge color="primary" pill className="ms-1">{totalWorkers}</Badge>
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: active === '2' })}
//             onClick={() => toggleTab('2')}
//             style={{ cursor: 'pointer' }}
//           >
//             Settings
//           </NavLink>
//         </NavItem>
//       </Nav>
//
//       {/* Tab Content */}
//       <TabContent activeTab={active}>
//         <TabPane tabId="1">
//           <h4>Total Workers: {totalWorkers}</h4>
//           {workers.length > 0 ? (
//             <ListGroup>
//               {workers.map(worker => (
//                 <ListGroupItem key={worker.id} className="d-flex justify-content-between align-items-center">
//                   <span>
//                     <strong>{worker.name}</strong> - {worker.role}
//                   </span>
//                   <Badge color={worker.status === 'Active' ? 'success' : 'danger'}>
//                     {worker.status}
//                   </Badge>
//                 </ListGroupItem>
//               ))}
//             </ListGroup>
//           ) : (
//             <p className="text-muted">No workers available.</p>
//           )}
//         </TabPane>
//         <TabPane tabId="2">
//           <p>Settings content goes here.</p>
//         </TabPane>
//       </TabContent>
//     </div>
//   )
// }
//
// export default UserTabs
