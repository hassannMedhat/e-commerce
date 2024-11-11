import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const RelatedProducts = ({ category, currentProductId }) => {
  const { products, currency } = useContext(ShopContext);

  const relatedProducts = products
    .filter(product => 
      product.category === category && 
      String(product.id) !== String(currentProductId)
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-medium mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;