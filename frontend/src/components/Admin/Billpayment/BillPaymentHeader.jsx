import React from "react";

const BillPaymentHeader = ({ title, handleBackToSelection }) => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-300 to-blue-500 text-white p-2 rounded-md shadow-md mb-6 relative flex justify-between items-center">
      <h1 className="text-xl font-bold text-center flex-grow">{title}</h1>
      <button
        onClick={handleBackToSelection}
        className="bg-white text-blue-500 px-2 py-2 rounded-md font-semibold shadow hover:bg-blue-100"
      >
        Back to Bill's
      </button>
    </div>
  );
};

export default BillPaymentHeader;
