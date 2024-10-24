import React from "react";
import BillPaymentHeader from "./BillPaymentHeader";

const MunicipalFeePayment = ({ handleBackToSelection }) => {
  return (
    <div className="relative w-full">
      {/* Header Section */}
      <BillPaymentHeader title="Municipal Fee Payment" handleBackToSelection={handleBackToSelection} />

      {/* Additional Municipal Fee Payment Content */}
    </div>
  );
};

export default MunicipalFeePayment;
