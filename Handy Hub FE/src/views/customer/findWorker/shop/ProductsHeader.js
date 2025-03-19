// ** Third Party Components
import classnames from 'classnames';
import { Menu, Grid, List } from 'react-feather';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap';

// ** React Hooks
import { useEffect, useState } from 'react';

const ProductsHeader = ({ activeView, setActiveView, setSidebarOpen }) => {
  // ** Sorting Options
  const sortToggleText = {
    'price-desc': 'Highest',
    'price-asc': 'Lowest',
    featured: 'Featured',
  };

  // ** State for API Data
  const [data, setData] = useState({
    totalProducts: 0,
    params: {
      sortBy: 'featured', // Default sorting option
    },
  });

  // ** Fetch Data Function
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/worker/header'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('API Response:', result);

      // Validate and extract relevant data
      if (result.success && result.body) {
        const { sortBy, totalProducts } = result.body;
        setData({
          totalProducts: parseInt(totalProducts, 10) || 0, // Convert to number, fallback to 0
          params: {
            sortBy: sortBy || 'featured', // Use sortBy or fallback to 'featured'
          },
        });
      } else {
        console.error('Invalid API response:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // ** Fetch Data on Component Mount
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  // ** Handle Sorting Changes
  const handleSortChange = (sortBy) => {
    console.log(`Sorting by: ${sortBy}`);
    // You can trigger an API call or update local state here
  };

  return (
    <div className='ecommerce-header'>
      <Row>
        <Col sm='12'>
          <div className='ecommerce-header-items'>
            {/* Sidebar Toggle and Total Results */}
            <div className='result-toggler'>
              <button
                className='navbar-toggler shop-sidebar-toggler'
                onClick={() => setSidebarOpen(true)}
              >
                <span className='navbar-toggler-icon d-block d-lg-none'>
                  <Menu size={14} />
                </span>
              </button>
              {/* Display total products */}
              <span className='search-results'>
                {data.totalProducts !== undefined ? `${data.totalProducts} Results Found` : 'Loading...'}
              </span>
            </div>

            {/* Sorting Dropdown and View Toggles */}
            <div className='view-options d-flex'>
              {/* Sorting Dropdown */}
              <UncontrolledButtonDropdown className='dropdown-sort'>
                <DropdownToggle className='text-capitalize me-1' color='primary' outline caret>
                  {sortToggleText[data.params.sortBy] || 'Sort'}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className='w-100' onClick={() => handleSortChange('featured')}>
                    Featured
                  </DropdownItem>
                  <DropdownItem className='w-100' onClick={() => handleSortChange('price-asc')}>
                    Lowest
                  </DropdownItem>
                  <DropdownItem className='w-100' onClick={() => handleSortChange('price-desc')}>
                    Highest
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>

              {/* View Toggles */}
              <ButtonGroup>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeView === 'grid',
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn list-view-btn', {
                    active: activeView === 'list',
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('list')}
                >
                  <List size={18} />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsHeader;