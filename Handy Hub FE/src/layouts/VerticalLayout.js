// ** React Imports
import { Outlet } from "react-router-dom"

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout"

// ** Menu Items Array
import { navigation } from "@src/navigation/vertical"
import { useEffect, useState } from "react"
import {getUserRole} from "@configs/AuthConfig"

const VerticalLayout = (props) => {

  const [filteredRoutes, setFilteredRoutes] = useState([])
  const [userRole, setUserRole] = useState("")

  useEffect(() => {

    // const userRole = JSON.parse(localStorage.getItem("token"))
    // const userRole = user?.userRole
    // const userRole = "ADMIN"
    // const userRole = "CUSTOMER"
    // const userRole = "WORKER"
    const userRole = getUserRole()
    console.log("userRole Auth " ,getUserRole())
    console.log("userRole Auth " ,userRole)
    if (userRole) {
      const routes = navigation.filter(route => route.roles.includes(userRole))
      setFilteredRoutes(routes)
    }
  }, [])


  return (
    <Layout menuData={filteredRoutes} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
