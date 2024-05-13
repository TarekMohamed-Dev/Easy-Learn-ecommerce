import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductBanner from "./components/ProductBanner";
import ProductInfo from "./components/ProductInfo";
import Header from "@/components/Header";
import useFetch from "@/hooks/useFetch";
import SimilarProducts from "../SimilarProducts";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  return (
    <div>
      <Header />
      <div className="px-10 pt-20 pb-8 md:px-28">
        {/* Display loading skeleton if data is loading */}
        {loading && (
          <div className="grid justify-around grid-cols-1 lg:grid-cols-2 mt-10 sm:gap-0">
            <ProductBanner />
            <ProductInfo />
          </div>
        )}

        {/* Display product banner and info if data is loaded */}
        {product && (
          <div className="grid justify-around grid-cols-1 lg:grid-cols-2 mt-10 sm:gap-0">
            <ProductBanner product={product} />
            <ProductInfo product={product} />
          </div>
        )}
        {product && (
          <div>
            <h2 className="mt-24 mb-4 text-xl">Similar Products</h2>
            {/* Pass the category prop to SimilarProducts */}
            <SimilarProducts category={product.attributes.category} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
