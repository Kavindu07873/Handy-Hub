import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Star, ShoppingCart, Heart } from 'react-feather';
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap';

const ProductCards = ({ products, addToCart, addToWishlist, deleteWishlistItem, activeView }) => {

  const handleCartBtn = (id, isInCart) => {
    addToCart(id);
  };

  const handleWishlistClick = (id, isInWishlist) => {
    if (isInWishlist) {
      deleteWishlistItem(id);
    } else {
      addToWishlist(id);
    }
  };

  const renderProducts = () => {
    return products.map((item, index) => (
      <Card className="ecommerce-card" key={item.id || index}>
        <div className="item-img text-center mx-auto">
          <Link to={`/customer-worker-details/${item.id}`}>
            <img className="img-fluid card-img-top" src={item.imageUrl} alt={item.name} />
          </Link>
        </div>
        <CardBody>
          <div className="item-wrapper">
            <div className="item-rating">
              <ul className="unstyled-list list-inline">
                {[...Array(5)].map((_, idx) => (
                  <li key={`star-${item.id}-${idx}`} className="ratings-list-item me-25">
                    <Star
                      className={classnames({
                        'filled-star': idx + 1 <= item.rating,
                        'unfilled-star': idx + 1 > item.rating,
                      })}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="item-cost">
              <h6 className="item-price">${item.price}</h6>
            </div>
          </div>
          <h6 className="item-name">
            <CardText tag="span" className="item-company">
              By{' '}
              <span className="company-name">{item.brand}</span>
            </CardText>
          </h6>
          <CardText className="item-description">{item.description}</CardText>
        </CardBody>
        <div className="item-options text-center">
          <div className="item-wrapper">
            <div className="item-cost">
              <h4 className="item-price">${item.price}</h4>
              {item.hasFreeShipping && (
                <CardText className="shipping">
                  <Badge color="light-success">Free Shipping</Badge>
                </CardText>
              )}
            </div>
          </div>
          <Button
            className="btn-wishlist"
            color="light"
            onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
          >
            <Heart
              className={classnames('me-50', { 'text-danger': item.isInWishlist })}
              size={14}
            />
            <span>Wishlist</span>
          </Button>
          {item.isInCart ? (
            <Link to="/checkout">
              <Button color="primary" className="btn-cart move-cart">
                <ShoppingCart className="me-50" size={14} />
                <span>View In Cart</span>
              </Button>
            </Link>
          ) : (
            <Button
              color="primary"
              className="btn-cart move-cart"
              onClick={() => handleCartBtn(item.id, item.isInCart)}
            >
              <ShoppingCart className="me-50" size={14} />
              <span>Add To Cart</span>
            </Button>
          )}
        </div>
      </Card>
    ));
  };

  return (
    <div className={classnames({ 'grid-view': activeView === 'grid', 'list-view': activeView === 'list' })}>
      {renderProducts()}
    </div>
  );
};

export default ProductCards;
