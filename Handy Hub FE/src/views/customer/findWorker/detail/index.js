import { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ** Product detail components
import ItemFeatures from "./ItemFeatures";
import RelatedProducts from "./RelatedProducts";
import WorkerProfile from "./workerProfileDetails"; // Corrected import
import HireWorker from "./HireWorker"; // Import the HireWorker component

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Button, CardText } from "reactstrap";

// ** Icons
import { Star } from "react-feather";

const Details = () => {
  // Extract product ID from URL params
  const { id } = useParams();
  const navigate = useNavigate();

  // State for product details
  const [product, setProduct] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to control whether to show the WorkerProfile section
  const [showWorkerProfile, setShowWorkerProfile] = useState(false);

  // State to control whether to show the HireWorker section
  const [showHireWorker, setShowHireWorker] = useState(false);

  // Fetch product details from API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/worker/details/${id}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("API Response:", result);

        if (result.success && result.body) {
          const productData = result.body;
          setProduct(productData);
          setInWishlist(productData.inWishlist || false);
          setSelectedColor(productData.colorOptions?.[0] || null); // Default to the first color option
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);


  // Handle See Worker Details Profile button click
  const handleSeeDetails = () => {
    setShowWorkerProfile(true); // Show only the WorkerProfile section
    setShowHireWorker(false); // Ensure HireWorker section is hidden
  };

  // Handle Hire Worker button click
  const handleHireWorker = () => {
    setShowHireWorker(true); // Show the HireWorker section
    setShowWorkerProfile(false); // Ensure WorkerProfile section is hidden
  };

  // Render Loading State
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render Error State
  if (error) {
    return <div>{error}</div>;
  }

  // Render Product Not Found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Fragment>
      {/* Breadcrumbs */}
      {/*<BreadCrumbs title="Product Details" data={[{ title: "eCommerce" }, { title: "Details" }]} />*/}

      <div className="app-ecommerce-details">
        <Card>
          {/* Main Product Details */}
          <CardBody>
            <Row>
              {/* Product Image */}
              <Col md="5">
                <img
                  className="img-fluid"
                  src={product.images?.[0] || "/images/default.jpg"}
                  alt={product.name}
                  style={{ maxHeight: 400 }}
                />
              </Col>

              {/* Product Details */}
              <Col md="7">
                <h2>{product.name}</h2>
                <CardText>by {product.brand}</CardText>

                {/* Star Rating */}
                <div className="d-flex align-items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <Star
                      key={index}
                      size={20}
                      fill={index < Math.round(product.rating) ? "#FF9F43" : "transparent"}
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
                          className={`color-option me-2 ${
                            selectedColor === color ? "selected" : ""
                          }`}
                          style={{
                            background: color,
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            border: "2px solid #ddd",
                            cursor: "pointer",
                          }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Worker Action Buttons */}
                <div className="d-flex flex-column flex-md-row mt-3">
                  {/* Button 1: See Worker Details Profile */}
                  <Button
                    color="info" // Use a neutral color like "info" for viewing details
                    className="me-md-2 mb-2 mb-md-0"
                    onClick={handleSeeDetails} // Call function to show WorkerProfile
                  >
                    <span>See Worker Details Profile</span>
                  </Button>

                  {/* Button 2: Hire Worker */}
                  <Button
                    color="primary" // Use "primary" color for the hiring action
                    onClick={handleHireWorker} // Call function to show HireWorker
                  >
                    <span>Hire Worker</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>

          {/* Features Section */}
          {!showWorkerProfile && !showHireWorker && (
            <ItemFeatures features={product.features} />
          )}

          {/* Related Products */}
          {!showWorkerProfile && !showHireWorker && (
            <CardBody>
              <RelatedProducts products={product.relatedProducts || []} />
            </CardBody>
          )}

          {/* Worker Profile Section */}
          {showWorkerProfile && (
            <CardBody>
              <WorkerProfile /> {/* Corrected component usage */}
            </CardBody>
          )}

          {/* Hire Worker Section */}
          {showHireWorker && (
            <CardBody>
              <HireWorker
                onClose={() => setShowHireWorker(false)} // Close the HireWorker section
              />
            </CardBody>
          )}
        </Card>
      </div>
    </Fragment>
  );
};

export default Details;