import { Link } from "react-router-dom";
import classnames from "classnames";
import { ShoppingCart } from "react-feather";
import { Card, CardBody, CardText, Button } from "reactstrap";
// App.js or index.js
import './App.css'; // Import the global CSS file

const ProductCards = ({ products, addToCart, addToWishlist, deleteWishlistItem, activeView }) => {
  // Render products dynamically
  const renderProducts = () => {
    if (!products || products.length === 0) {
      return <p>No products available</p>;
    }

    return products.map((item, index) => (
      <Card className="ecommerce-card" key={item.id || index}>
        <div className="item-img text-center mx-auto">
          <Link to={`/customer-worker-details/${item.id}`}>
            <img className="img-fluid card-img-top" src={item.imageUrl} alt={item.username} />
          </Link>
        </div>
        <CardBody>
          <h6 className="item-name">
            <CardText tag="span" className="item-company">
              By{" "}
              <span className="company-name">{`${item.name} `}</span>
            </CardText>
          </h6>
          <CardText className="item-description">{item.email}</CardText>
          <CardText className="item-description">{item.workerType}</CardText>
        </CardBody>
        <div className="item-options text-center">
          <Button
            color="primary"
            className="btn-cart move-cart"
            onClick={() => addToCart(item.id)}
          >
            <ShoppingCart className="me-50" size={14} />
            <span>View Worker</span>
          </Button>
        </div>
      </Card>
    ));
  };

  return (
    <div
      className={classnames({
        "grid-view": activeView === "grid",
        "list-view": activeView === "list",
      })}
    >
      {renderProducts()}
    </div>
  );
};

export default ProductCards;