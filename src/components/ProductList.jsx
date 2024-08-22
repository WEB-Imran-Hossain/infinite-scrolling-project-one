import { useEffect, useRef, useState } from "react";
import Product from "./Product";

const productsPerPage = 10;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
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
      }
      setPage((prevPage) => prevPage + 1);
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    //clennup
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);

  return (
    <div>
      <div>ProductList</div>

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

      {hasMore && <div ref={loaderRef}>Loading more products...</div>}
    </div>
  );
};

export default ProductList;
