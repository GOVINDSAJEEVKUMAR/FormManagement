import React from 'react';

const DisplayPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-6">Inventory Items</h2>
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th>Item No</th>
            <th>Item Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Unit Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through items */}
          <tr>
            <td>123</td>
            <td>Example Item</td>
            <td>Brand A</td>
            <td>Category X</td>
            <td>Supplier 1</td>
            <td>$10</td>
            <td>Enabled</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplayPage;
