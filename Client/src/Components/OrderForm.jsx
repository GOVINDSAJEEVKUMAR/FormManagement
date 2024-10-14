import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PurchaseOrderForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [items, setItems] = useState([]);
  const [orderNo] = useState(Date.now()); // Auto-generated Order No
  const [itemDetails, setItemDetails] = useState({
    itemNo: '',
    itemName: '',
    stockUnit: '',
    unitPrice: 0,
    packingUnit: '',
    orderQty: 0,
  });

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(items);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PurchaseOrder');
    XLSX.writeFile(workbook, 'PurchaseOrder.xlsx');
  };

  const handleAddItem = () => {
    const netAmount = itemDetails.orderQty * itemDetails.unitPrice;
    const newItem = { ...itemDetails, netAmount };
    setItems([...items, newItem]);
    setItemDetails({
      itemNo: '',
      itemName: '',
      stockUnit: '',
      unitPrice: 0,
      packingUnit: '',
      orderQty: 0,
    });
  };

 
  const handleNavigateToInventory = () => {
    navigate("/"); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Purchase Order</h2>
        <button 
          onClick={handleNavigateToInventory} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Go to Inventory
        </button>
      </div>

      <form className="space-y-4">
        <div className="flex justify-between">
          <label className="w-full">
            Order No (Auto-generated)
            <input type="text" className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed" value={orderNo} disabled />
          </label>
          <label className="w-full ml-4">
            Order Date
            <input type="date" className="w-full p-2 border rounded-md" value={new Date().toISOString().slice(0, 10)} readOnly />
          </label>
        </div>

        <div className="flex justify-between">
          <label className="w-full">
            Supplier Name
            <div className="relative">
              <input type="text" className="w-full p-2 border rounded-md" placeholder="Search supplier..." />
              <FiSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
            </div>
          </label>
        </div>

        {/* Items Section */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg">Item List</h3>
          <div className="flex justify-between mt-4">
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Item No"
              value={itemDetails.itemNo}
              onChange={(e) => setItemDetails({ ...itemDetails, itemNo: e.target.value })}
            />
            <input
              type="text"
              className="w-full p-2 border rounded-md ml-4"
              placeholder="Item Name"
              value={itemDetails.itemName}
              onChange={(e) => setItemDetails({ ...itemDetails, itemName: e.target.value })}
            />
          </div>

          <div className="flex justify-between mt-4">
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Stock Unit"
              value={itemDetails.stockUnit}
              onChange={(e) => setItemDetails({ ...itemDetails, stockUnit: e.target.value })}
            />
            <input
              type="number"
              className="w-full p-2 border rounded-md ml-4"
              placeholder="Unit Price"
              value={itemDetails.unitPrice}
              onChange={(e) => setItemDetails({ ...itemDetails, unitPrice: parseFloat(e.target.value) })}
            />
          </div>

          <div className="flex justify-between mt-4">
            <select
              className="w-full p-2 border rounded-md"
              value={itemDetails.packingUnit}
              onChange={(e) => setItemDetails({ ...itemDetails, packingUnit: e.target.value })}
            >
              <option value="">Packing Unit</option>
              <option value="Box">Box</option>
              <option value="Kg">Kg</option>
              <option value="Litre">Litre</option>
            </select>
            <input
              type="number"
              className="w-full p-2 border rounded-md ml-4"
              placeholder="Order Qty"
              value={itemDetails.orderQty}
              onChange={(e) => setItemDetails({ ...itemDetails, orderQty: parseInt(e.target.value) })}
            />
          </div>

          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Item
          </button>

          <div className="mt-6">
            <h3 className="font-semibold text-lg">Added Items</h3>
            {items.map((item, index) => (
              <div key={index} className="flex justify-between mt-4">
                <div className="w-full">{item.itemNo}</div>
                <div className="w-full">{item.itemName}</div>
                <div className="w-full">{item.stockUnit}</div>
                <div className="w-full">{item.unitPrice.toFixed(2)}</div>
                <div className="w-full">{item.packingUnit}</div>
                <div className="w-full">{item.orderQty}</div>
                <div className="w-full">${item.netAmount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button type="button" onClick={handleExport} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Export to Excel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Print Purchase Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseOrderForm;
