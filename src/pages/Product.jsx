import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState('');

  useEffect(() => {
    console.log("Products:", products); // للتحقق من استيراد المنتجات
    console.log("ProductId:", productId); // للتحقق من حصول المعرف
    if (products && products.length > 0 && productId) {
      const product = products.find(item => String(item.id) === String(productId));
      if (product) {
        setProductData(product);
        console.log("Product Data:", product); // تأكد من إيجاد المنتج
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* صورة المنتج */}
        <div className="flex-1">
          <img
            className="w-full h-auto object-cover rounded-lg"
            src={productData.image}
            alt={productData.name}
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>

        {/* معلومات المنتج */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <p className="mt-5 text-3xl font-medium">
            {productData.price} {currency}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* اختيار المقاس */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes && productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 ${
                    item === size ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* زر الإضافة إلى السلة */}
          <button 
            onClick={() => addToCart(productData.id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-gray-800"
            disabled={!size}
          >
            {size ? 'ADD TO CART' : 'SELECT SIZE FIRST'}
          </button>
        </div>
      </div>

      {/* قسم المنتجات المتعلقة */}
      {productData.category && (
        <RelatedProducts 
          category={productData.category} 
          currentProductId={productData.id}
        />
      )}
    </div>
  );

};
export default Product;
