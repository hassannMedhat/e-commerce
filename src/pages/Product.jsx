import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (products && products.length > 0 && productId) {
          const product = products.find(
            (item) => String(item.id) === String(productId)
          );
          if (product) {
            setProductData(product);
          } else {
            throw new Error("Product not found");
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId, products]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!productData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Transform sizes object to an array of size labels and quantities
  const sizesArray = productData.sizes || []; // Assuming sizes is an array of objects

  // Check if the product is out of stock
  const isOutOfStock =
    sizesArray.length === 0 ||
    sizesArray.every((sizeObj) => sizeObj.quantity === 0);

  // Calculate total quantity of all sizes
  const totalQuantity = sizesArray.reduce(
    (acc, sizeObj) => acc + sizeObj.quantity,
    0
  );

  return (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 overflow-hidden">
          <img
            className="w-full h-auto object-cover rounded-lg cursor-pointer"
            src={productData.image}
            alt={productData.name}
            style={{ aspectRatio: "1 / 1" }}
            onClick={handleImageClick}
          />
        </div>

        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <p className="mt-5 text-3xl font-medium">
            {productData.price} {currency}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* Select Size */}
          <div className="flex flex-col gap-4 my-8">
            {!isOutOfStock && <p>Select Size</p>}
            <div className="flex gap-2">
              {sizesArray.map((sizeObj, index) => (
                <button
                  key={index}
                  onClick={() => sizeObj.quantity > 0 && setSize(sizeObj.size)}
                  className={`border py-2 px-4 rounded-full 
                    ${sizeObj.quantity === 0 ? "border-red-600 bg-red-200 text-white cursor-not-allowed hover:bg-red-300" : "bg-blue-500 text-white hover:bg-blue-600"} 
                    ${size === sizeObj.size && sizeObj.quantity > 0 ? "bg-blue-700" : ""} 
                    ${sizeObj.quantity === 0 ? "hover:bg-red-400" : ""}`}
                  disabled={sizeObj.quantity === 0}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
          </div>

          {/* Display total quantity with a message if it is 5 or less */}
          {totalQuantity <= 5 && totalQuantity > 0 && (
            <p className="text-red-600 mt-4 font-bold">
              Hurry up! Only {totalQuantity} left in stock! Get yours before
              they're gone!
            </p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData.id, size)}
            className={`px-8 py-3 text-sm active:bg-gray-700 hover:bg-gray-800 ${isOutOfStock ? 'bg-red-500 text-white' : 'bg-black text-white'}`}
            disabled={!size || isOutOfStock}
          >
            {isOutOfStock ? 'All sizes are out of stock' : (size ? 'ADD TO CART' : 'SELECT SIZE FIRST')}
          </button>
        </div>
      </div>

      {/* Related Products */}
      {productData.category && (
        <RelatedProducts
          category={productData.category}
          currentProductId={productData.id}
        />
      )}

      {/* Modal for Image */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={closeModal}>
          <img
            className="max-w-full max-h-full"
            src={productData.image}
            alt={productData.name}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Product;
