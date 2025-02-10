import { Mail, Home, Users, Briefcase, Circle } from "react-feather";

export const navigation =  [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
    roles:['ADMIN', 'CUSTOMER']
  },
  {
    id: "secondPage",
    title: "Manage Customers",
    icon: <Users size={20} />,
    navLink: "/second-page",
    roles:['CUSTOMER']
  },
  {
    id: "Workers",
    title: "Manage Workers",
    icon: <Briefcase size={20} />,
    navLink: "/third-page",
    roles:['CUSTOMER']

  },
  {
    id: 'accountSettings',
    title: 'Account Settings',
    icon: <Circle size={12} />,
    navLink: '/account-setting',
    roles:['ADMIN']

  }
];
