import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const LocalBusinessFeesComponent = ({ goBack }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Local Business Fees</h3>
      <div className="mb-6">
        <h4 className="text-lg font-semibold">Pending Fees</h4>
        <div className="p-4 bg-white shadow rounded-md mb-4">
          <p>Business License ID: 56789</p>
          <p>Fee Amount: ₹1500</p>
          <p>Due Date: 12/12/2024</p>
        </div>
        <div className="p-4 bg-white shadow rounded-md mb-4">
          <p>Business License ID: 12345</p>
          <p>Fee Amount: ₹1200</p>
          <p>Due Date: 10/30/2024</p>
        </div>
      </div>
      <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={goBack}>
        <FaArrowLeft className="mr-2" /> Back to Payments
      </button>
    </div>
  );
};

export default LocalBusinessFeesComponent;
