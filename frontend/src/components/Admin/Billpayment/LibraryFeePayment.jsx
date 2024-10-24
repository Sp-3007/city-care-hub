import React from "react";
import BillPaymentHeader from "./BillPaymentHeader";

const LibraryFeePayment = ({ handleBackToSelection }) => {
  return (
    <div className="relative w-full">
      {/* Header Section */}
      <BillPaymentHeader title="Library Fee Payment" handleBackToSelection={handleBackToSelection} />

      {/* Additional Library Fee Payment Content */}
    </div>
  );
};

export default LibraryFeePayment;
