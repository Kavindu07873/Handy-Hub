// ** React Imports
import { useEffect, useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Product detail components
import ItemFeatures from './ItemFeatures'
import ProductDetails from './ProductDetails'
import RelatedProducts from './RelatedProducts'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Button, CardText } from 'reactstrap'

// ** Icons
import { Star } from 'react-feather'

// ** Example product data (to simulate API response)
const sampleProduct = {
  id: '1',
  name: 'Wireless Bluetooth Headphones',
  price: 149.99,
  description: 'High-quality wireless headphones with 20-hour battery life and noise cancellation',
  images: ['https://i5.walmartimages.com/asr/de03acff-5b8a-40c6-b30e-472ccac63b1a_1.d1d018fe917627a1cd9f46142c001bcc.jpeg',
    'https://i5.walmartimages.com/asr/de03acff-5b8a-40c6-b30e-472ccac63b1a_1.d1d018fe917627a1cd9f46142c001bcc.jpeg'],
  features: ['Noise cancellation', '20h battery', 'Bluetooth 5.0'],
  rating: 4.5,
  inWishlist: false,
  colorOptions: ['#007bff', '#28a745', '#dc3545'],
  brand: 'AudioTech',
  hasFreeShipping: true
}

const relatedProducts = [
  { id: '2', name: 'Smart Fitness Tracker', price: 59.99, image: '/images/fitness-tracker.jpg' },
  { id: '3', name: 'Wireless Earbuds', price: 79.99, image: '/images/earbuds.jpg' }
]

const Details = () => {
  const [product, setProduct] = useState(sampleProduct)
  const [inWishlist, setInWishlist] = useState(false)
  const [selectedColor, setSelectedColor] = useState(sampleProduct.colorOptions?.[0] || '#007bff')
  const [cartItems, setCartItems] = useState([])

  // Get product slug from URL
  const { product: productSlug } = useParams()
  console.log("productSlug  : ", productSlug)
  const productId = productSlug?.split('/').pop() // Extract the last part as product ID
  useEffect(() => {
    console.log("productId  : ",productId)
    if (productId) {
      // Simulate an API call to fetch product details
      setTimeout(() => {
        setProduct(sampleProduct)
        setInWishlist(sampleProduct.inWishlist)
      }, 500)
    }
  }, [productId])

  const handleAddToCart = () => {
    setCartItems((prevItems) => [...prevItems, product.id])
    console.log('Added to cart:', product.id)
  }

  const toggleWishlist = () => {
    setInWishlist((prev) => !prev)
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <Fragment>
      {/*<BreadCrumbs title="Product Details" data={[{ title: 'eCommerce' }, { title: 'Details' }]} />*/}
      <div className="app-ecommerce-details">
        <Card>
          <CardBody>
            <Row>
              <Col md="5">
                <img
                  className="img-fluid"
                  src={product.images?.[0] || '/images/default.jpg'}
                  alt={product.name}
                  style={{ maxHeight: 400 }}
                />
              </Col>
              <Col md="7">
                <h2>{product.name}</h2>
                <CardText>by {product.brand}</CardText>

                {/* Star Rating */}
                <div className="d-flex align-items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <Star
                      key={index}
                      size={20}
                      fill={index < Math.round(product.rating) ? '#FF9F43' : 'transparent'}
                      stroke="#FF9F43"
                      strokeWidth={2}
                    />
                  ))}
                </div>

                <h4 className="text-primary">${product.price}</h4>
                <CardText>{product.description}</CardText>

                {/* Color Selection */}
                {product.colorOptions?.length > 0 && (
                  <div className="my-2">
                    <strong>Color:</strong>
                    <div className="d-flex mt-1">
                      {product.colorOptions.map((color) => (
                        <div
                          key={color}
                          className={`color-option me-2 ${selectedColor === color ? 'selected' : ''}`}
                          style={{
                            background: color,
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            border: '2px solid #ddd',
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart & Wishlist Buttons */}
                <div className="d-flex flex-column flex-md-row mt-3">
                  <Button color="primary" className="me-md-2 mb-2 mb-md-0" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                  <Button color="secondary" outline onClick={toggleWishlist}>
                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>

          {/* Features Section */}
          <ItemFeatures features={product.features} />

          {/* Related Products */}
          <CardBody>
            <RelatedProducts products={relatedProducts} />
          </CardBody>
        </Card>
      </div>
    </Fragment>
  )
}

export default Details
