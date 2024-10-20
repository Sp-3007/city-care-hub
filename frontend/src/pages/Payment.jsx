import React, { useState } from "react";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [amount, setAmount] = useState("");

  const paymentOptions = [
    {
      id: "waterBill",
      title: "Water Bill",
      description: "Monthly water usage charges.",
      icon: "water",
    },
    {
      id: "electricityBill",
      title: "Electricity Bill",
      description: "Monthly electricity usage charges.",
      icon: "bolt",
    },
    {
      id: "propertyTax",
      title: "Property Tax",
      description: "Annual property tax based on property value.",
      icon: "home",
    },
    {
      id: "municipalFee",
      title: "Municipal Fee",
      description: "General municipal service fees.",
      icon: "business",
    },
    {
      id: "fines",
      title: "Fines",
      description: "Traffic or other fines.",
      icon: "warning",
    },
    {
      id: "libraryFee",
      title: "Library Fees",
      description: "Fees for library services or late book returns.",
      icon: "book",
    },
  ];

  const handlePaymentSelect = (id) => {
    setSelectedPayment(id);
    setIdNumber(""); // Clear previous ID number
    setAmount(""); // Clear previous amount
  };

  const handleIdNumberChange = (e) => {
    setIdNumber(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit payment logic here, e.g., send data to server
    console.log({ selectedPayment, idNumber, amount });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 border rounded-md cursor-pointer hover:shadow-lg ${
              selectedPayment === option.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => handlePaymentSelect(option.id)}
          >
            <div className="flex items-center justify-center mb-4">
            <span
  className={`material-icons text-4xl ${selectedPayment === option.id ? 'text-blue-500 drop-shadow-custom' : 'text-gray-600'}`}
>
  {option.icon}
</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
            <p className="text-gray-600">{option.description}</p>
          </div>
        ))}
      </div>

      {selectedPayment && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID Number
            </label>
            <input
              type="text"
              value={idNumber}
              onChange={handleIdNumberChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your ID number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter amount"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </form>
      )}
    </div>
  );
};

export default Payment;
