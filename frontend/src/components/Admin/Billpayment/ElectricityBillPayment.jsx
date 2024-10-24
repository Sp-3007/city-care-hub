import React from "react";
import BillPaymentHeader from "../Billpayment/BillPaymentHeader"; // Import the reusable header

const ElectricityBillPayment = ({ handleBackToSelection }) => {
  return (
    <div className="relative w-full">
      {/* Header Section using the reusable component */}
      <BillPaymentHeader
        title="Electricity Bill Payment"
        handleBackToSelection={handleBackToSelection}
      />

      {/* Additional Electricity Bill Payment Content */}
    </div>
  );
};

export default ElectricityBillPayment;
