import { Mail, Home, Users, Briefcase, Circle } from "react-feather";

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
    id: 'accountSettings',
    title: 'Account Settings',
    icon: <Circle size={12} />,
    navLink: '/account-setting',
    roles:['ADMIN']

  },
  {
    id: "customerDashboard",
    title: "Dashboard",
    icon: <Users size={20} />,
    navLink: "/customer-dashboard",
    roles:['CUSTOMER']
  },
  {
    id: "workerDashboard",
    title: "Dashboard",
    icon: <Users size={20} />,
    navLink: "/worker-dashboard",
    roles:['WORKER']
  }
];
