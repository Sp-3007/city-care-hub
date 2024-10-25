import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const ElectricityBillComponent = ({ goBack }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Electricity Bill</h3>
      <div className="mb-6">
        <h4 className="text-lg font-semibold">Pending Bills</h4>
        <div className="p-4 bg-white shadow rounded-md mb-4">
          <p>Bill ID: 11223</p>
          <p>Amount: ₹600</p>
          <p>Due Date: 11/05/2024</p>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Completed Bills</h4>
        <div className="p-4 bg-white shadow rounded-md mb-4">
          <p>Bill ID: 99877</p>
          <p>Amount Paid: ₹550</p>
          <p>Payment Date: 10/02/2024</p>
        </div>
      </div>
      <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={goBack}>
        <FaArrowLeft className="mr-2" /> Back to Payments
      </button>
    </div>
  );
};

export default ElectricityBillComponent;
