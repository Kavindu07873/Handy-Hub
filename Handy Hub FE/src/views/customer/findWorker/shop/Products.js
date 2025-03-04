import { useState } from "react";
import ProductCards from "./ProductCards";
import ProductsHeader from "./ProductsHeader";
import ProductsSearchbar from "./ProductsSearchbar";
import classnames from "classnames";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import {
  addToCart,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem,
  getCartItems,
} from "@src/views/customer/findWorker/store"; // Adjust the path accordingly

const ProductsPage = ({
                        error,
                        loading,
                        setSidebarOpen,
                        sidebarOpen,
                        activeView,
                        setActiveView,
                        totalProducts,
                        products
                      }) => {
  const [totalWorkers, setTotalWorkers] = useState(totalProducts); // Initialize with totalProducts
  const [page, updatePage] = useState(1); // Renamed `setPage` to `updatePage`
  const [size] = useState(10);

  console.log("totalWorkers  : ", totalWorkers);

  const handlePageChange = (val) => {
    if (val === "next" && page < Math.ceil(totalWorkers / size)) {
      updatePage((prev) => prev + 1);
    } else if (val === "prev" && page > 1) {
      updatePage((prev) => prev - 1);
    } else if (typeof val === "number") {
      updatePage(val);
    }
  };

  return (
    <div className="content-detached content-right">
      <div className="content-body">
        {/* Header with View Toggle */}
        <ProductsHeader
          activeView={activeView}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
          totalProducts={totalWorkers}
        />

        {/* Overlay for Sidebar */}
        <div
          className={classnames("body-content-overlay", { show: sidebarOpen })}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Search Bar */}
        <ProductsSearchbar />

        {/* Loading, Error, or Product Content */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length ? (
          <>
            {/* Product Cards */}
            <ProductCards
              // addToCart={addToCart}
              activeView={activeView}
              products={products}
              // getCartItems={getCartItems}
              // addToWishlist={addToWishlist}
              // deleteCartItem={deleteCartItem}
              // deleteWishlistItem={deleteWishlistItem}
            />

            {/* Pagination */}
            <Pagination className="d-flex justify-content-center ecommerce-shop-pagination mt-2">
              <PaginationItem disabled={page === 1} onClick={() => handlePageChange("prev")}>
                <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                  &laquo;
                </PaginationLink>
              </PaginationItem>
              {[...Array(Math.ceil(totalWorkers / size)).keys()].map((index) => (
                <PaginationItem key={index} active={page === index + 1} onClick={() => handlePageChange(index + 1)}>
                  <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem
                disabled={page === Math.ceil(totalWorkers / size)}
                onClick={() => handlePageChange("next")}
              >
                <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                  &raquo;
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </>
        ) : (
          <p>No Results</p>
        )}
      </div>
    </div>
  )
}

export default ProductsPage