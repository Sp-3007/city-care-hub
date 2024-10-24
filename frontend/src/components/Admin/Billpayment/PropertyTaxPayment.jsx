import React from "react";
import BillPaymentHeader from "./BillPaymentHeader";

const PropertyTaxPayment = ({ handleBackToSelection }) => {
  return (
    <div className="relative w-full">
      {/* Header Section */}
      <BillPaymentHeader title="Property Tax Payment" handleBackToSelection={handleBackToSelection} />

      {/* Additional Property Tax Payment Content */}
    </div>
  );
};

export default PropertyTaxPayment;
