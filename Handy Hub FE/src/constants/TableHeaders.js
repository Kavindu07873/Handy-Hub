import {Link} from "react-router-dom"
import {Badge} from "reactstrap"

export const CustomerTableHeaders = [
    {
        name: 'Full Name',
        sortable: true,
        minWidth: '300px',
        sortField: 'fullName',
        selector: row => row.fullName,
        cell: row => (
            <div className='d-flex justify-content-left align-items-center'>
                <div className='d-flex flex-column'>
                    <Link
                        // to={`/apps/user/view/${row.id}`}
                        to={`/admin/secondPage/view/${row.id}`}
                        className='user_name text-truncate text-body'
                    >
                        <span className='fw-bolder'>{row.fullName}</span>
                    </Link>
                    <small className='text-truncate text-muted mb-0'>{row.email}</small>
                </div>
            </div>
        )
    },
    {
        name: 'Email',
        sortable: true,
        minWidth: '172px',
        sortField: 'role',
        selector: row => row.email
    },
    {
        name: 'Mobile Number',
        minWidth: '138px',
        sortable: true,
        sortField: 'currentPlan',
        selector: row => row.mobileNumber
    },
    {
        name: 'Customer Rank',
        minWidth: '230px',
        sortable: true,
        sortField: 'billing',
        selector: row => row.customerRank
    }
]

export const WorkerTableHeaders = [
    {
        name: 'Name',
        sortable: true,
        minWidth: '300px',
        sortField: 'lastName',
        selector: row => row.name,
        cell: row => (
            <div className='d-flex justify-content-left align-items-center'>
                <div className='d-flex flex-column'>
                    <Link
                        // to={`/apps/user/view/${row.id}`}
                        to={`/admin/secondPage/view/${row.id}`}
                        className='user_name text-truncate text-body'
                    >
                        <span className='fw-bolder'>{row.name}</span>
                    </Link>
                    <small className='text-truncate text-muted mb-0'>{row.email}</small>
                </div>
            </div>
        )
    },
    {
        name: 'Email',
        sortable: true,
        minWidth: '172px',
        sortField: 'role',
        selector: row => row.email
    },
    {
        name: 'Mobile Number',
        minWidth: '138px',
        sortable: true,
        sortField: 'currentPlan',
        selector: row => row.mobileNumber
    },
    {
        name: 'Type',
        minWidth: '230px',
        sortable: true,
        sortField: 'billing',
        selector: row => row.workerType
    }
]

