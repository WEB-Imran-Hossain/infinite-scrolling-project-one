import { useEffect, useRef, useState } from "react";
import Product from "./Product";

// Number of products to fetch per page
const productsPerPage = 10;

const ProductList = () => {
  // State to store products
  const [products, setProducts] = useState([]);
  // State to keep track of the current page
  const [page, setPage] = useState(0);
  // State to check if there are more products to load
  const [hasMore, setHasMore] = useState(true);
  // Ref to the loader element for Intersection Observer
  const loaderRef = useRef(null);

  useEffect(() => {
    let observer;

    // Function to fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${productsPerPage}&skip=${page * productsPerPage}`
        );
        const data = await response.json();

        // If no products are returned, set hasMore to false
        if (data.products.length === 0) {
          setHasMore(false);
        } else {
          // Append new products to the existing list and increment the page number
          setProducts((prevProducts) => [...prevProducts, ...data.products]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error); // Log any errors during fetch
      }
    };

    // Callback function to handle when the loader element comes into view
    const onIntersection = ([entry]) => {
      if (entry.isIntersecting && hasMore) {
        fetchProducts(); // Fetch more products when loader is visible
      }
    };

    // Create an Intersection Observer to trigger fetching when the loader is visible
    observer = new IntersectionObserver(onIntersection);

    // Start observing the loader element
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]); // Dependencies for useEffect to trigger on `hasMore` and `page`

  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold mb-10 text-center">ProductList</h2>

      {/* Grid layout to display products in multiple columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-[80vw] mx-auto">
        {products.map((product) => (
          <Product
            key={product.id} // Unique key for each product
            title={product.title}
            description={product.description}
            category={product.category}
            price={product.price}
            images={product.images}
          />
        ))}
      </div>

      {/* Loader element to indicate that more products are being loaded */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="text-center mt-8 p-4 border-t border-gray-200 text-gray-600 text-lg font-semibold animate-pulse"
        >
          Loading more products...
        </div>
      )}
    </div>
  );
};

export default ProductList;