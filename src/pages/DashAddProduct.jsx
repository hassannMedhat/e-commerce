import axios from 'axios';
import { useState } from 'react';

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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    try {
      if (formData.sizes.length === 0) {
        alert("Please select at least one size");
        return;
      }

      const response = await axios.post("http://localhost:7000/products", formData);

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
    setFormData(prevState => ({
      ...prevState,
      sizes: prevState.sizes.includes(size)
        ? prevState.sizes.filter(s => s !== size)
        : [...prevState.sizes, size]
    }));
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
                  formData.sizes.includes(size)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

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
