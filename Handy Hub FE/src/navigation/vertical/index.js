import { Mail, Home, Users, Briefcase, Circle } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "Manage Customers",
    icon: <Users size={20} />,
    navLink: "/second-page",
  },
  {
    id: "Workers",
    title: "Manage Workers",
    icon: <Briefcase size={20} />,
    navLink: "/third-page",
  },
  {
    id: 'accountSettings',
    title: 'Account Settings',
    icon: <Circle size={12} />,
    permissions: ['admin', 'editor'],
    navLink: '/account-setting'
  }
];
