/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../index.css";
import { toast } from "react-toastify";

const DashboardStock = () => {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4001/products");
        const data = await response.json();
        console.log("Fetched products:", data);

        const updatedData = data.map((product) => ({
          ...product,
          totalQuantity: product.sizes.reduce(
            (sum, sizeObj) => sum + sizeObj.quantity,
            0
          ),
        }));

        setProducts(updatedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.id.toString().includes(searchId)
  );

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
    setQuantities({});
    setTotalQuantity(0);
    console.log("Selected product for editing:", product);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = async () => {
    const updatedSizes = selectedProduct.sizes.map((sizeObj) => {
      return {
        size: sizeObj.size,
        quantity: quantities[sizeObj.size] !== undefined ? quantities[sizeObj.size] : sizeObj.quantity,
      };
    });

    const total = updatedSizes.reduce((sum, item) => sum + item.quantity, 0);

    const productData = {
      ...selectedProduct,
      sizes: updatedSizes,
      totalQuantity: total,
    };

    console.log("Product data to save:", productData);

    try {
      const response = await fetch(
        `http://localhost:4001/products/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update product: ${errorText}`);
      }

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, sizes: updatedSizes, totalQuantity: total }
            : product
        )
      );

      toast.success("Data saved successfully!");
      closePopup();
    } catch (error) {
      console.error("Error saving product data:", error);
      toast.error("Error saving data, please try again.");
    }
  };

  const handleQuantityChange = (size) => (event) => {
    const value = parseInt(event.target.value) || 0; // تحويل القيمة إلى رقم، أو 0 إذا كانت فارغة
    setQuantities((prev) => ({
      ...prev,
      [size]: value, // تحديث القيم المدخلة
    }));

    // تحديث إجمالي الكميات ديناميكيًا
    const updatedQuantities = { ...quantities, [size]: value };
    const total = Object.values(updatedQuantities).reduce(
      (sum, qty) => sum + qty,
      0
    );
    setTotalQuantity(total);
    console.log("Updated quantities:", updatedQuantities);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>

      <input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="border border-gray-300 p-2 mb-4"
      />

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Sizes</th>
            <th className="py-2 px-4 border-b">Total Quantity</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">{product.name}</td>
              <td className="py-2 px-4 border-b">
                {product.sizes.length > 0
                  ? product.sizes
                      .map((item) => `${item.size}: ${item.quantity}`)
                      .join(", ")
                  : "N/A"}
              </td>

              <td className="py-2 px-4 border-b">
                {product.totalQuantity || 0}
              </td>

              <td className="py-2 px-4 border-b">
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded shadow-md transition-all duration-200"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && selectedProduct && selectedProduct.sizes && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Edit Sizes for {selectedProduct.name}</h2>

            {selectedProduct.sizes.map((sizeObj, index) => (
              <div key={index} className="size-input">
                <label>
                  {sizeObj.size} (Current: {sizeObj.quantity})
                </label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  className="ml-2"
                  value={
                    quantities[sizeObj.size] !== undefined
                      ? quantities[sizeObj.size]
                      : sizeObj.quantity
                  }
                  onChange={(e) => handleQuantityChange(sizeObj.size)(e)}
                />
              </div>
            ))}

            <div className="mt-4">
              <strong>Total Quantity for {selectedProduct.name}: </strong>
              {selectedProduct.sizes.reduce(
                (sum, sizeObj) =>
                  sum +
                  (quantities[sizeObj.size] !== undefined
                    ? quantities[sizeObj.size]
                    : sizeObj.quantity),
                0
              )}
            </div>

            <div className="button-group mt-4">
              <button onClick={closePopup} className="btn-close">
                Close
              </button>
              <button onClick={handleSave} className="btn-save">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStock;
