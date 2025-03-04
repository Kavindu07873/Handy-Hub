import { Fragment, useState, useEffect, useCallback } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** API Call (Direct API Call)
import * as workersApi from '../../../../utility/api/customerFindWorkersApi'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'

const Shop = () => {
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [workers, setWorkers] = useState([])
  const [totalWorkers, setTotalWorkers] = useState(0)
  const [page, setPage] = useState(1)
  const [size,setSize] = useState(9)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // Fetch workers when page changes



  const  loadWorkers = async () => {
    const res = await workersApi.fetchWorkers(page, size)
    console.log("index worker",res.content)
    setWorkers(res.content)
    setTotalWorkers(res.totalElements)
  }
  
  
  // const loadWorkers = useCallback(async () => {
  //   setLoading(true)
  //   setError(null)
  //
  //   try {
  //     console.log(`Fetching workers - Page: ${page}, Size: ${size}`) // Debugging
  //
  //     const response = await workersApi.fetchWorkers('', '', page, size)
  //     console.log('Full API Response:', response)// Debugging API response
  //
  //     if (response && response.data && Array.isArray(response.data.content)) {
  //       setWorkers(response.data.content)
  //       setTotalWorkers(response.data.totalElements || 0)
  //     } else {
  //       throw new Error('Invalid response format')
  //     }
  //   } catch (err) {
  //     console.error('API Error:', err)
  //     setError('Failed to fetch workers')
  //   } finally {
  //     setLoading(false)
  //   }
  // }, [page, size])

  useEffect(() => {
    loadWorkers()
  }, [])

  return (
    <Fragment>
      <Breadcrumbs title="Shop" data={[{ title: 'eCommerce' }, { title: 'Shop' }]} />
      <Products
        products={workers}
        totalProducts={totalWorkers}
        activeView={activeView}
        setActiveView={setActiveView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        loading={loading}
        error={error}
        setPage={setPage} // Pass setPage to allow pagination
      />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </Fragment>
  )
}

export default Shop
