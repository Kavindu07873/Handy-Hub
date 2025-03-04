import { Fragment, useState, useEffect } from 'react';
import { Button } from 'reactstrap'; // Import Button
import Products from './Products';
import * as workersApi from '../../../../utility/api/customerFindWorkersApi';

// ** Styles
import '@styles/react/apps/app-ecommerce.scss';
import Breadcrumbs from "@components/breadcrumbs";

const Shop = () => {
  // ** State Variables
  const [activeView, setActiveView] = useState('grid'); // Tracks the current view (grid or list)
  const [workers, setWorkers] = useState([]); // Stores the fetched workers/products
  const [totalWorkers, setTotalWorkers] = useState(0); // Total number of workers/products
  const [page, setPage] = useState(1); // Current page for pagination
  const [size, setSize] = useState(9); // Number of items per page
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // ** Fetch Workers/Products
  const loadWorkers = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching workers - Page: ${page}, Size: ${size}`); // Debugging

      const response = await workersApi.fetchWorkers(page, size);
      console.log('Full API Response:', response); // Debugging API response

      if (response && Array.isArray(response.content)) {
        setWorkers(response.content);
        setTotalWorkers(response.totalElements || 0);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to fetch workers');
    } finally {
      setLoading(false);
    }
  };

  // ** Load Workers on Component Mount or Page Change
  useEffect(() => {
    loadWorkers();
  }, [page, size]);

  return (
    <Fragment>
      {/* View Toggle Buttons */}
      {/*<div className="d-flex justify-content-end mb-2">*/}
      {/*  <Button*/}
      {/*    color={activeView === 'grid' ? 'primary' : 'secondary'}*/}
      {/*    onClick={() => setActiveView('grid')}*/}
      {/*    className="me-1"*/}
      {/*  >*/}
      {/*    Grid View*/}
      {/*  </Button>*/}
      {/*  <Button*/}
      {/*    color={activeView === 'list' ? 'primary' : 'secondary'}*/}
      {/*    onClick={() => setActiveView('list')}*/}
      {/*  >*/}
      {/*    List View*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {/* Products Component */}
      <Products
        products={workers}
        totalProducts={totalWorkers}
        activeView={activeView} // Pass the active view to the Products component
        setActiveView={setActiveView}
        loading={loading}
        error={error}
        setPage={setPage} // Pass setPage to allow pagination
      />
    </Fragment>
  );
};

export default Shop;