// ** Icons Imports
import { Search } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap';

// ** React Hooks
import { useEffect, useState } from 'react';

const ProductsSearchbar = props => {
  // ** Props
  const { setSidebarOpen } = props;

  // ** State for API Data
  const [data, setData] = useState({
    params: {
      q: '' // Default search query
    }
  })

  // ** Fetch Initial Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080//worker/initial-data') // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result) // Update state with fetched data
      } catch (error) {
        console.error('Error fetching initial data:', error)
      }
    }

    fetchData() // Call the API when the component mounts
  }, [])

  // Simulate search functionality without Redux
  const handleSearchChange = e => {
    const query = e.target.value
    console.log(`Searching for: ${query}`)
    // You can update the local state or perform any other action here
  }

  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row className='mt-1'>
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Search Product'
              value={data.params.q} // Use API data for the search query
              onChange={handleSearchChange} // Handle search input changes
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsSearchbar;