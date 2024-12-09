import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, quidem
          incidunt aperiam perspiciatis odit molestias, quis at eius officiis,
          nemo molestiae. Dolorem rerum voluptatibus porro vero eaque ullam
          expedita ea.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.length > 0 ? (
          latestProducts.map((item) => {
            // Calculate total quantity of all sizes
            const totalQuantity = item.sizes.reduce((acc, sizeObj) => acc + sizeObj.quantity, 0);

            return (
              <div key={item.id} className="relative">
                <ProductItem
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  sizes={item.sizes || []} // Ensure sizes is passed as an array
                />
                {/* Display total quantity with a message if it is 5 or less */}
                {totalQuantity <= 5 && totalQuantity > 0 && (
                  <p className="text-red-600 mt-2 font-bold">
                    Only {totalQuantity} left in stock! Hurry up!
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
