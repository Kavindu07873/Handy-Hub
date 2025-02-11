import {
  Mail,
  Home,
  Users,
  Briefcase,
  Circle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Calendar,
  Search
} from "react-feather";

export const navigation =  [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
    roles:['ADMIN']
  },
  {
    id: "secondPage",
    title: "Manage Customers",
    icon: <Users size={20} />,
    navLink: "/second-page",
    roles:['ADMIN']
  },
  {
    id: "Workers",
    title: "Manage Workers",
    icon: <Briefcase size={20} />,
    navLink: "/third-page",
    roles:['ADMIN']

  },
  {
    id: "workerDashboard",
    title: "Dashboard",
    icon: <Users size={20} />,
    navLink: "/worker-dashboard",
    roles:['WORKER']
  },
  {
    id: "workerApproveWork",
    title: "Approve Work",
    icon: <CheckCircle size={20} />,
    navLink: "/worker-approve",
    roles:['WORKER']
  },
  {
    id: "workerPendingWork",
    title: "Pending Work",
    icon: <Clock  size={20} />,
    navLink: "/worker-PendingWork",
    roles:['WORKER']
  },
  {
    id: "workerCalender",
    title: "Calender",
    icon: <Calendar size={20} />,
    navLink: "/calender",
    roles:['WORKER']
  },
  {
    id: "customerDashboard",
    title: "Dashboard",
    icon: <Users size={20} />,
    navLink: "/customer-dashboard",
    roles:['CUSTOMER']
  },
  {
    id: "customerFindWorker",
    title: "Find Worker",
    icon: <Search size={20} />,
    navLink: "/customer-findWorker",
    roles:['CUSTOMER']
  },
  {
    id: 'accountSettings',
    title: 'Account Settings',
    icon: <Circle size={12} />,
    navLink: '/account-setting',
    roles:['ADMIN' , 'CUSTOMER' ,'WORKER']

  }
]
