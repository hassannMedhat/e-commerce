/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '../index.css';

const DashboardStock = () => {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:7000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search ID
  const filteredProducts = products.filter(product => 
    product.id.toString().includes(searchId)
  );

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = () => {
    // Implement the save functionality here
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stock Management</h1>
      <p>Manage your stock here.</p>
      
      {/* Search Input */}
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
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="py-2 px-4 border-b text-center">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.sizes.join(', ')}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:underline" onClick={() => handleEditClick(product)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Edit Sizes for {selectedProduct.name}</h2>
            {selectedProduct.sizes.map((size, index) => (
              <div key={index} className="size-input">
                <label>{size}</label>
                <input type="number" placeholder="Enter quantity" className="ml-2" />
              </div>
            ))}
            <div className="button-group">
              <button onClick={closePopup}>Close</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStock; 