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
  Search, Compass
} from "react-feather";

export const navigation =  [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
    roles:['ROLE_ADMIN']
  },
  {
    id: "secondPage",
    title: "Manage Customers",
    icon: <Users size={20} />,
    navLink: "/second-page",
    roles:['ROLE_ADMIN']
  },
  {
    id: "Workers",
    title: "Manage Workers",
    icon: <Briefcase size={20} />,
    navLink: "/third-page",
    roles:['ROLE_ADMIN']

  },
  {
    id: "workerDashboard",
    title: "Dashboard",
    icon: <Users size={20} />,
    navLink: "/worker-dashboard",
    roles:['ROLE_WORKER']
  },
  {
    id: "workerApproveWork",
    title: "Approve Work",
    icon: <CheckCircle size={20} />,
    navLink: "/worker/approve-work",
    roles:['ROLE_WORKER']
  },
  // {
  //   id: "workerPendingWork",
  //   title: "Pending Work",
  //   icon: <Clock  size={20} />,
  //   navLink: "/worker-PendingWork",
  //   roles:['ROLE_WORKER']
  // },
  {
    id: "workerCalender",
    title: "Calender",
    icon: <Calendar size={20} />,
    navLink: "/worker/calender",
    roles:['ROLE_WORKER']
  },
  {
    id: "workerProfile",
    title: "Profile",
    icon: <Compass size={20} />,
    navLink: "/worker/worker-profile",
    roles:['ROLE_WORKER']
  },
  {
    id: "customerDashboard",
    title: "Dashboard",
    icon: <Users size={20} />,
    navLink: "/customer-dashboard",
    roles:['ROLE_CUSTOMER']
  },
  {
    id: "customerFindWorker",
    title: "Find Worker",
    icon: <Search size={20} />,
    navLink: "/find-worker-shop",
    roles:['ROLE_CUSTOMER']
  },
  {
    id: 'accountSettings',
    title: 'account Settings',
    icon: <Circle size={12} />,
    navLink: '/customer/customer-profile',
    roles:['ROLE_CUSTOMER']

  }
]
