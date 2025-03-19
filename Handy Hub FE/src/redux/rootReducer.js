// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import users from '@src/views/admin/secondPage/store'
// import customerFindWorker from '@src/views/customer/findWorker/store'
// import customerProfile from '@src/views/customer/customerProfile/store'
// import workerProfile from '@src/views/worker/workerProfile/store'
import workerCalender from '@src/views/worker/calendar/store'

// const rootReducer = {
//   navbar, layout };

const rootReducer = {
  // auth,
  // todo,
  // chat,
  // email,
  users,
  // kanban,
  navbar,
  layout,
  // invoice,
  // calendar,
  // customerFindWorker,
  // dataTables,
  // permissions,
  // customerProfile,
  workerCalender
  //workerProfile
}

export default rootReducer
