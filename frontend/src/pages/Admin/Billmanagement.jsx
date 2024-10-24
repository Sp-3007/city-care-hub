import React, { useState } from "react";
import LeftNavBar from "../../components/Admin/LeftNavBar ";
import TopNavBar from "../../components/Admin/TopNavBar";
import WaterBillPayment from "../../components/Admin/BillPayment/WaterBillPayment";
import ElectricityBillPayment from "../../components/Admin/BillPayment/ElectricityBillPayment";
import PropertyTaxPayment from "../../components/Admin/BillPayment/PropertyTaxPayment";
import MunicipalFeePayment from "../../components/Admin/BillPayment/MunicipalFeePayment";
import LocalBusinessLicenseFeePayment from "../../components/Admin/BillPayment/LocalBusinessLicenseFeePayment";
import LibraryFeePayment from "../../components/Admin/BillPayment/LibraryFeePayment";

import {
  FaWater,
  FaBolt,
  FaHome,
  FaCity,
  FaBusinessTime,
  FaBook,
} from "react-icons/fa";



const AdminBillManagement = () => {


  const handleBackToSelection = () => {
    setSelectedBillType(null); // Reset to go back to bill selection
  };

  
  const [selectedBillType, setSelectedBillType] = useState(null);

  const billTypes = [
    {
      id: "waterBill",
      title: "Water Bill",
      description: "Monthly water usage charges.",
      icon: <FaWater size={35} />,
      component: <WaterBillPayment handleBackToSelection={handleBackToSelection} />,
    },
    {
      id: "electricityBill",
      title: "Electricity Bill",
      description: "Monthly electricity usage charges.",
      icon: <FaBolt size={35} />,
      component: <ElectricityBillPayment handleBackToSelection={handleBackToSelection} />,
    },
    {
      id: "propertyTax",
      title: "Property Tax",
      description: "Annual property tax based on property value.",
      icon: <FaHome size={35} />,
      component: <PropertyTaxPayment handleBackToSelection={handleBackToSelection} />,
    },
    {
      id: "municipalFee",
      title: "Municipal Fee",
      description: "General municipal service fees.",
      icon: <FaCity size={35} />,
      component: <MunicipalFeePayment handleBackToSelection={handleBackToSelection} />,
    },
    {
      id: "localBusinessLicenseFee",
      title: "Local Business License Fee",
      description: "Monthly fee for local businesses to maintain licenses.",
      icon: <FaBusinessTime size={35} />,
      component: <LocalBusinessLicenseFeePayment handleBackToSelection={handleBackToSelection} />,
    },
    {
      id: "libraryFee",
      title: "Library Fees",
      description: "Fees for library services or late book returns.",
      icon: <FaBook size={35} />,
      component: <LibraryFeePayment handleBackToSelection={handleBackToSelection} />,
    },
  ];

  const handleBillTypeSelect = (id) => {
    setSelectedBillType(id);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavBar />
      <div className="flex">
        <LeftNavBar />
        <div className="flex-grow flex flex-col items-center bg-gray-100 p-4 mt-3">
          
          {/* Conditional Rendering: Show Bill Type Selection or Selected Component */}
          {selectedBillType ? (
            <div className="w-full p-6 bg-white rounded-md shadow-md mb-6">
              
                            {/* Render Selected Bill Payment Component */}
              {billTypes.find((option) => option.id === selectedBillType)?.component}
            </div>
          ) : (
            <>
              {/* Header Design */}
              <div className="w-full bg-gradient-to-r from-blue-300 to-blue-500 text-white p-4 rounded-md shadow-md mb-6">
                <h2 className="text-xl font-semibold text-center">
                  Admin Bill Management
                </h2>
              </div>

              {/* Reduced Width of Revenue Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 w-full justify-evenly">
                <div className="bg-green-100 p-4 rounded-md shadow-sm flex flex-col items-center flex-grow">
                  <h3 className="text-lg font-medium text-green-600">
                    Total Revenue Generated
                  </h3>
                  <p className="text-xl font-bold mt-2">$120,000</p>{" "}
                  {/* Replace with dynamic data */}
                </div>

                <div className="bg-red-100 p-4 rounded-md shadow-sm flex flex-col items-center flex-grow">
                  <h3 className="text-lg font-medium text-red-600">
                    Pending Revenue
                  </h3>
                  <p className="text-xl font-bold mt-2">$45,000</p>{" "}
                  {/* Replace with dynamic data */}
                </div>
              </div>

              {/* Bill Type Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-6 mt-7">
                {billTypes.map((option) => (
                  <div
                    key={option.id}
                    className={`w-80 h-40 flex flex-col justify-center items-center p-4 border rounded-md cursor-pointer hover:shadow-md ${
                      selectedBillType === option.id
                        ? "border-blue-400"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleBillTypeSelect(option.id)}
                  >
                    <div
                      className={`text-3xl mb-5 ${
                        selectedBillType === option.id
                          ? "text-blue-500"
                          : "text-gray-600"
                      }`}
                    >
                      {option.icon}
                    </div>
                    <h3 className="text-sm font-medium text-center mb-5">
                      {option.title}
                    </h3>
                    <p className="text-gray-500 text-xs text-center">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBillManagement;
