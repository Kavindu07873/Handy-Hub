// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
// import Sidebar from './Sidebar'

// ** Table Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {fetchWorkers} from "@src/service/workerService"
import {WorkerTableHeaders} from "@src/constants/TableHeaders";

// ** Table Header
const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {

  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {
  // ** Store Vars
  // const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })
  const [workersData, setWorkersData] = useState([])
  const [totalElements, setTotalElements] = useState(0)

  // ** Function to toggle sidebar
  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount

    const fetchAllWorkers = async () => {
        const res = await fetchWorkers()
        if (res.success) {
            setWorkersData(res.body.content)
            setTotalElements(res.body.totalElements)
        } else {
            console.error(res.msg)
        }
    }

  useEffect(() => {

    // dispatch(getAllData())
    // dispatch(
    //   getData({
    //     sort,
    //     sortColumn,
    //     q: searchTerm,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     role: currentRole.value,
    //     status: currentStatus.value,
    //     currentPlan: currentPlan.value
    //   })
    // )
      fetchAllWorkers()
  }, [])

  // ** User filter options
  const roleOptions = [
    { value: '', label: 'Select Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'author', label: 'Author' },
    { value: 'editor', label: 'Editor' },
    { value: 'maintainer', label: 'Maintainer' },
    { value: 'subscriber', label: 'Subscriber' }
  ]

  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'basic', label: 'Basic' },
    { value: 'company', label: 'Company' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'team', label: 'Team' }
  ]

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 }
  ]

  // ** Function in get data on page change
  const handlePagination = page => {
    // dispatch(
    //   getData({
    //     sort,
    //     sortColumn,
    //     q: searchTerm,
    //     perPage: rowsPerPage,
    //     page: page.selected + 1,
    //     role: currentRole.value,
    //     status: currentStatus.value,
    //     currentPlan: currentPlan.value
    //   })
    // )
    setCurrentPage(page.selected + 1, async () => {
        const res = await fetchWorkers(page.selected + 1, rowsPerPage)
        if (res.success) {
            setWorkersData(res.body.content)
            setTotalElements(res.body.totalElements)
        } else {
            console.error(res.msg)
        }
    })
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    // dispatch(
    //   getData({
    //     sort,
    //     sortColumn,
    //     q: searchTerm,
    //     perPage: value,
    //     page: currentPage,
    //     role: currentRole.value,
    //     currentPlan: currentPlan.value,
    //     status: currentStatus.value
    //   })
    // )
    setRowsPerPage(value, async () => {
        const res = await fetchWorkers(currentPage, value)
        if (res.success) {
            setWorkersData(res.body.content)
            setTotalElements(res.body.totalElements)
        } else {
            console.error(res.msg)
        }
    })
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    // dispatch(
    //   getData({
    //     sort,
    //     q: val,
    //     sortColumn,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     role: currentRole.value,
    //     status: currentStatus.value,
    //     currentPlan: currentPlan.value
    //   })
    // )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }


  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    // dispatch(
    //   getData({
    //     sort,
    //     sortColumn,
    //     q: searchTerm,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     role: currentRole.value,
    //     status: currentStatus.value,
    //     currentPlan: currentPlan.value
    //   })
    // )
  }

  return (
    <Fragment>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={WorkerTableHeaders}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={workersData}
            onChangeRowsPerPage={handlePerPage}
            onChangePage={handlePagination}
            paginationTotalRows={totalElements}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                // toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      {/*<Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />*/}
    </Fragment>
  )
}

export default UsersList
