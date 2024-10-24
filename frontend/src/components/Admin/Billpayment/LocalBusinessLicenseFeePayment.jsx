import React from "react";
import BillPaymentHeader from "./BillPaymentHeader";

const LocalBusinessLicenseFeePayment = ({ handleBackToSelection }) => {
  return (
    <div className="relative w-full">
      {/* Header Section */}
      <BillPaymentHeader title="Local Business License Fee Payment" handleBackToSelection={handleBackToSelection} />

      {/* Additional Local Business License Fee Payment Content */}
    </div>
  );
};

export default LocalBusinessLicenseFeePayment;
