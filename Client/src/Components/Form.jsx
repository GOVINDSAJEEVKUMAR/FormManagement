import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const InventoryForm = () => {
  const [itemDetails, setItemDetails] = useState({
    itemNo: Math.floor(Math.random() * 100000), // Auto-generated item number
    itemName: '',
    location: '',
    brand: '',
    category: '',
    supplier: '',
    stockUnit: 'Unit',
    unitPrice: '',
    itemImages: [],
    status: 'Enabled',
  });
  
  const [showItem, setShowItem] = useState(false); // State to control item display
  const navigate = useNavigate(); // Initialize the navigate function

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setItemDetails((prev) => ({
      ...prev,
      itemImages: [...prev.itemImages, ...files],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // After handling submission, show item details
    setShowItem(true);
  };

  const handleRedirectToPurchase = () => {
    // Redirect to purchase page
    navigate('/order');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-6">Inventory Management</h2>
      

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <label className="w-full">
            Item No (Auto-generated)
            <input 
              type="text" 
              className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed" 
              value={itemDetails.itemNo} 
              readOnly 
            />
          </label>
          <label className="w-full ml-4">
            Item Name
            <input 
              type="text" 
              name="itemName"
              className="w-full p-2 border rounded-md" 
              value={itemDetails.itemName} 
              onChange={handleChange} 
              required 
            />
          </label>
        </div>

        <div className="flex justify-between">
          <label className="w-full">
            Inventory Location
            <input 
              type="text" 
              name="location"
              className="w-full p-2 border rounded-md" 
              value={itemDetails.location} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label className="w-full ml-4">
            Brand
            <input 
              type="text" 
              name="brand"
              className="w-full p-2 border rounded-md" 
              value={itemDetails.brand} 
              onChange={handleChange} 
              required 
            />
          </label>
        </div>

        <div className="flex justify-between">
          <label className="w-full">
            Category
            <input 
              type="text" 
              name="category"
              className="w-full p-2 border rounded-md" 
              value={itemDetails.category} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label className="w-full ml-4">
            Supplier
            <div className="relative">
              <input 
                type="text" 
                name="supplier"
                className="w-full p-2 border rounded-md" 
                placeholder="Search supplier..." 
                value={itemDetails.supplier} 
                onChange={handleChange} 
                required 
              />
              <FiSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
            </div>
          </label>
        </div>

        <div className="flex justify-between">
          <label className="w-full">
            Stock Unit
            <select 
              name="stockUnit"
              className="w-full p-2 border rounded-md" 
              value={itemDetails.stockUnit} 
              onChange={handleChange}
            >
              <option value="Unit">Unit</option>
              <option value="Box">Box</option>
              <option value="Kg">Kg</option>
            </select>
          </label>
          <label className="w-full ml-4">
            Unit Price
            <input 
              type="number" 
              name="unitPrice"
              className="w-full p-2 border rounded-md" 
              value={itemDetails.unitPrice} 
              onChange={handleChange} 
              required 
            />
          </label>
        </div>

        <div className="flex justify-between">
          <label className="w-full">
            Item Images
            <input 
              type="file" 
              multiple 
              className="w-full p-2 border rounded-md" 
              onChange={handleImageUpload} 
            />
          </label>
          <label className="w-full ml-4">
            Status
            <select 
              name="status"
              className="w-full p-2 border rounded-md" 
              value={itemDetails.status} 
              onChange={handleChange}
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </label>
        </div>

        <button type="submit" className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>

      {showItem && (
        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-semibold">Added Item Details:</h3>
          <div className="mt-2">
            <p><strong>Item No:</strong> {itemDetails.itemNo}</p>
            <p><strong>Item Name:</strong> {itemDetails.itemName}</p>
            <p><strong>Location:</strong> {itemDetails.location}</p>
            <p><strong>Brand:</strong> {itemDetails.brand}</p>
            <p><strong>Category:</strong> {itemDetails.category}</p>
            <p><strong>Supplier:</strong> {itemDetails.supplier}</p>
            <p><strong>Stock Unit:</strong> {itemDetails.stockUnit}</p>
            <p><strong>Unit Price:</strong> ${itemDetails.unitPrice}</p>
            <p><strong>Status:</strong> {itemDetails.status}</p>
            <div className="mt-4">
              <strong>Item Images:</strong>
              <div className="flex mt-2">
                {itemDetails.itemImages.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)} // Create URL for local display
                    alt={`Item Image ${index + 1}`}
                    className="h-20 w-20 object-cover mr-2 rounded"
                  />
                ))}
              </div>
            </div>
          </div>
          <button 
            onClick={handleRedirectToPurchase} 
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Go to Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default InventoryForm;
