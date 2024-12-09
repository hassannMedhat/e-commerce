import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';

const DashAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    type: '',
    image: '',
    sizes: [] // إضافة مصفوفة للمقاسات
  });

  const [sizeQuantities, setSizeQuantities] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState(0);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    try {
      if (Object.keys(sizeQuantities).length === 0) {
        alert("Please select at least one size with quantity");
        return;
      }

      // Calculate total quantity
      const totalQuantity = Object.values(sizeQuantities).reduce((acc, quantity) => acc + quantity, 0);

      const response = await axios.post("http://localhost:4001/products", {
        ...formData,
        sizes: sizeQuantities,
        totalQuantity // إضافة الكمية الإجمالية
      });

      if (response.status === 200 || response.status === 201) {
        alert("Data submitted successfully");
        // Reset form
        setFormData({
          name: '',
          price: '',
          description: '',
          image: '',
          category: '',
          type: '',
          sizes: [] // إعادة تعيين المقاسات
        });
        setSizeQuantities({});
      } else {
        alert("Data submission failed");
      }
    } catch (error) {
      console.error("There was an error!", error);
      alert("An error occurred while submitting data");
    }
  };
  
  const availableSizes = ['S', 'M', 'L', 'XL', '2XL'];

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setIsModalOpen(true);
  };

  const handleQuantitySubmit = (quantity) => {
    setSizeQuantities(prev => ({
      ...prev,
      [selectedSize]: (prev[selectedSize] || 0) + quantity
    }));
    setIsModalOpen(false);
  };

  const handleDeleteSize = () => {
    setSizeQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[selectedSize];
      return newQuantities;
    });
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      
      <form onSubmit={onSubmitHandler} className="space-y-4">
        <div>
          <label className="block mb-1">Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border p-2 rounded"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Sizes:</label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-2 rounded border ${
                  sizeQuantities[size] ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                {size} {sizeQuantities[size] ? `(${sizeQuantities[size]})` : ''}
              </button>
            ))}
          </div>
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onRequestClose={() => setIsModalOpen(false)} 
          style={{
            content: {
              width: '300px',
              height: '250px',
              margin: 'auto',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#fff',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }
          }}
        >
          <h2 style={{ textAlign: 'center', color: '#333' }}>Enter Quantity for "{selectedSize}"</h2>
          <input
            type="number"
            min="1"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
            onChange={(e) => setCurrentQuantity(Number(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button 
              onClick={handleDeleteSize}
              style={{
                backgroundColor: '#f44336',
                color: '#fff',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
            <button 
              onClick={() => handleQuantitySubmit(currentQuantity)}
              style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Save
            </button>
          </div>
        </Modal>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default DashAddProduct;
