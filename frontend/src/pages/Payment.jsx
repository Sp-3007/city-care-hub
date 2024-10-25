import React, { useState } from "react";
import { FaWater, FaBolt, FaHome, FaBusinessTime, FaExclamationTriangle, FaBook } from "react-icons/fa";
import WaterBillComponent from "../components/User/Payment/WaterBillComponent";
import ElectricityBillComponent from "../components/User/Payment/ElectricityBillComponent";
import PropertyTaxComponent from "../components/User/Payment/PropertyTaxComponent";
import MunicipalFeeComponent from "../components/User/Payment/MunicipalFeeComponent";
import LocalBusinessFeesComponent from "../components/User/Payment/LocalBusinessFeesComponent";
import LibraryFeeComponent from "../components/User/Payment/LibraryFeeComponent";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState("");

  const paymentOptions = [
    { id: "waterBill", title: "Water Bill", description: "Monthly water usage charges.", icon: FaWater },
    { id: "electricityBill", title: "Electricity Bill", description: "Monthly electricity usage charges.", icon: FaBolt },
    { id: "propertyTax", title: "Property Tax", description: "Annual property tax based on property value.", icon: FaHome },
    { id: "municipalFee", title: "Municipal Fee", description: "General municipal service fees.", icon: FaBusinessTime },
    { id: "fines", title: "Fines", description: "Traffic or other fines.", icon: FaExclamationTriangle },
    { id: "libraryFee", title: "Library Fees", description: "Fees for library services or late book returns.", icon: FaBook },
  ];

  const renderSelectedComponent = () => {
    switch (selectedPayment) {
      case "waterBill":
        return <WaterBillComponent goBack={() => setSelectedPayment("")} />;
      case "electricityBill":
        return <ElectricityBillComponent goBack={() => setSelectedPayment("")} />;
      case "propertyTax":
        return <PropertyTaxComponent goBack={() => setSelectedPayment("")} />;
      case "municipalFee":
        return <MunicipalFeeComponent goBack={() => setSelectedPayment("")} />;
      case "fines":
        return <LocalBusinessFeesComponent goBack={() => setSelectedPayment("")} />;
      case "libraryFee":
        return <LibraryFeeComponent goBack={() => setSelectedPayment("")} />;
      default:
        return null;
    }
  };

  if (selectedPayment) {
    return <div>{renderSelectedComponent()}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8 text-center">Make a Payment</h2> {/* Centered header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`p-6 h-48 flex flex-col justify-center items-center border rounded-md cursor-pointer hover:shadow-xl transition-shadow duration-300 ${
              selectedPayment === option.id ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedPayment(option.id)}
          >
            <div className="flex items-center justify-center mb-4">
              <option.icon className={`text-5xl ${selectedPayment === option.id ? "text-blue-500" : "text-gray-600"}`} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">{option.title}</h3>
            <p className="text-gray-600 text-center">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
