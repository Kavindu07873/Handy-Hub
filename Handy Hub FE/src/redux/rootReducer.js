// ** Reducers Imports
import layout from "./layout"
import navbar from "./navbar"
import users from '@src/views/admin/secondPage/store'
import findWorker from '@src/views/worker/findWorker/store'

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
  findWorker
  // dataTables,
  // permissions
}

export default rootReducer
