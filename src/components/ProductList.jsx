import { useEffect, useRef, useState } from "react";
import Product from "./Product";

const productsPerPage = 10;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    let observer;

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
            page * productsPerPage
          }`
        );
        const data = await response.json();

        if (data.products.length === 0) {
          setHasMore(false);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data.products]);
          setPage((prevPage) => prevPage + 1); // Increment page after successful fetch
        }
      } catch (error) {
        console.error("Failed to fetch products:", error); // Handle fetch errors
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        // Temporarily disconnect the observer to avoid multiple fetches
        observer?.disconnect();
        fetchProducts().finally(() => {
          // Reconnect observer after fetching
          observer?.observe(loaderRef.current);
        });
      }
    };

    observer = new IntersectionObserver(onIntersection);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Cleanup function to disconnect the observer
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore]); // Remove `page` from dependencies to avoid multiple triggers

  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold mb-4 text-center mb-10">ProductList</h2>

      {/* Grid layout to display products in four columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-[80vw] mx-auto">
        {products.map((product) => (
          <Product
            key={product?.id}
            title={product?.title}
            description={product?.description}
            category={product?.category}
            price={product?.price}
            images={product?.images}
          />
        ))}
      </div>

      {/* Loader element to trigger fetching more products */}
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
