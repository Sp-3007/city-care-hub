import React, { useState } from "react";
import axios from 'axios';
import BillPaymentHeader from "../Billpayment/BillPaymentHeader";
import { getAuthToken } from "../../../config/FirebaseAuthToken";

const WaterBillPayment = ({ handleBackToSelection, user }) => {
  const [inputValue, setInputValue] = useState(""); // State for input value
  const [loading, setLoading] = useState(false); // Loading state for the request

  const handleCreateBill = async () => {
    if (inputValue.length === 6 || inputValue.length === 10) {
      setLoading(true);
      try {
        const authToken = await getAuthToken(); // Get the auth token

        // Send the input value as a query parameter in the GET request
        const response = await axios.get(
          `http://localhost:5000/api/admin/userdetails/${inputValue}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`, // Include the JWT token in headers
            },
          }
        );

        setLoading(false);

        if (response.status === 200) {
          const data = response.data;
          console.log("User data:", data);
          alert(`User found: ${data.name}`);
          // You can now display user data or create a bill for the user
        } else {
          alert("No user found. Please check the User ID or Mobile Number.");
        }
      } catch (err) {
        setLoading(false);
        console.error("Error fetching user data:", err);
        alert("Error fetching user data. Please try again.");
      }
    } else {
      alert("Please enter a valid 6-digit User ID or 10-digit Mobile Number.");
    }
  };

  return (
    <div className="relative w-full">
      {/* Header Section using the reusable component */}
      <BillPaymentHeader
        title="Water Bill Payment"
        handleBackToSelection={handleBackToSelection}
      />

      {/* Boxes for revenue generated and revenue pending */}
      <div className="flex justify-between mt-6 space-x-4">
        {/* Left Box - Revenue Generated */}
        <div className="flex-1 bg-blue-100 shadow-md rounded-lg p-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Total Revenue Generated</h2>
            <h2 className="text-lg font-semibold">Total Bills Paid</h2>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-xl font-bold">₹50,000</p>{" "}
            {/* Example total revenue */}
            <p className="text-xl font-bold">200</p>{" "}
            {/* Example number of bills paid */}
          </div>
        </div>

        {/* Right Box - Revenue Pending */}
        <div className="flex-1 bg-red-100 shadow-md rounded-lg p-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Revenue Pending</h2>
            <h2 className="text-lg font-semibold">Pending Bills</h2>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-xl font-bold">₹10,000</p>{" "}
            {/* Example pending revenue */}
            <p className="text-xl font-bold">50</p>{" "}
            {/* Example number of pending bills */}
          </div>
        </div>
      </div>

      {/* Input Field and Button to Create User Bill */}
      <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Create User Bill</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter 6-digit User ID or 10-digit Mobile Number"
            className="border border-gray-300 rounded p-2 flex-1"
            maxLength="10" // Limit input to 10 characters
            pattern="\d*" // Allow only numeric input
          />
          <button
            onClick={handleCreateBill}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : "Create Bill"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterBillPayment;
