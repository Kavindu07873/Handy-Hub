import { useState } from "react";
import ProductCards from "./ProductCards";
import ProductsHeader from "./ProductsHeader";
import ProductsSearchbar from "./ProductsSearchbar";
import classnames from "classnames";
// App.js or index.js
import './App.css'; // Import the global CSS file
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const ProductsPage = ({
                        error,
                        loading,
                        setSidebarOpen,
                        sidebarOpen,
                        totalProducts,
                        products
                      }) => {
  // State for pagination
  const [page, setPage] = useState(1); // Current page
  const [size] = useState(10); // Items per page

  // State for active view (grid or list)
  const [activeView, setActiveView] = useState("grid"); // Default to grid view

  // State for total workers/products
  const [totalWorkers, setTotalWorkers] = useState(totalProducts);

  console.log("totalWorkers : ", totalWorkers);

  // Handle pagination changes
  const handlePageChange = (val) => {
    if (val === "next" && page < Math.ceil(totalWorkers / size)) {
      setPage((prev) => prev + 1);
    } else if (val === "prev" && page > 1) {
      setPage((prev) => prev - 1);
    } else if (typeof val === "number") {
      setPage(val);
    }
  };

  return (
    <div className="content-detached content-right">
      <div className="content-body">
        {/* Header with View Toggle */}
        <ProductsHeader
          activeView={activeView}
          setActiveView={setActiveView} // Pass setActiveView to toggle views
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
              activeView={activeView} // Pass activeView to control layout
              products={products}
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
  );
};

export default ProductsPage;