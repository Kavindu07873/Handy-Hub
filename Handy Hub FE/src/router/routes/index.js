// ** React Imports
import { Fragment, lazy } from "react"
import { Navigate } from "react-router-dom"
// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"

// ** Utils
import { isObjEmpty } from "@utils"

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
}

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template"

// ** Default Route
const DefaultRoute = "/home"
// const DefaultRoute = "/customerdashboard"
// const DefaultRoute = "/workerdashboard"

const Home = lazy(() => import("../../views/admin/home/Home"))
const SecondPage = lazy(() => import("../../views/admin/secondPage/list/SecondPage"))
const ThirdPage = lazy(() => import("../../views/admin/adminWorkers/list/adminWorkers"))
const AccountSetting = lazy(() => import("../../views/admin/adminProfie/account-settings"))
const Login = lazy(() => import("../../views/Login"))
const Register = lazy(() => import("../../views/Register"))
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"))
const CustomerDashboard = lazy(() => import("../../views/customer/dashboard/DashBoardCustomer"))
const CustomerFindWorker = lazy(() => import("../../views/customer/findWorker/shop"))
const CustomerWorkerDetails = lazy(() => import("../../views/customer/findWorker/detail"))
const CustomerProfile = lazy(() => import("../../views/customer/customerProfile/view"))
const WorkerDashboard = lazy(() => import("../../views/worker/dashboard/DashBoardWorkers"))
const WorkerCalender = lazy(() => import("../../views/worker/calendar"))
const WorkerProfile = lazy(() => import("../../views/worker/workerProfile/view"))
const WorkerApproveWork = lazy(() => import("../../views/worker/approveWorks"))
const Error = lazy(() => import("../../views/Error"))

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/second-page",
    element: <SecondPage />
  },
  {
    path: "/third-page",
    element: <ThirdPage />
  },
  {
    path: "/account-setting",
    element: <AccountSetting />
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank"
    }
  },
  {
    path: "/customer-dashboard",
    element: <CustomerDashboard />
  },
  {
    path: "/worker-dashboard",
    element: <WorkerDashboard />
  },
  {
    path: "/find-worker-shop",
    element: <CustomerFindWorker />
  },
  {
    path: "/customer-worker-details/:id",
    element: <CustomerWorkerDetails />
  },
  {
    path: "/worker/calender",
    element: <WorkerCalender />
  },
  {
    path: "/customer/customer-profile",
    element: <CustomerProfile />
  },
  {
    path: "/worker/worker-profile",
    element: <WorkerProfile />
  },
  {
    path: "/worker/approve-work",
    element: <WorkerApproveWork />
  }
]

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta }
    } else {
      return {}
    }
  }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = []

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false)
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          )
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route)
      }
      return LayoutRoutes
    })
  }
  return LayoutRoutes
}

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical"
  const layouts = ["vertical", "horizontal", "blank"]

  const AllRoutes = []

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    })
  })
  return AllRoutes
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
