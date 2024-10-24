import React, { useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../../config/FirebaseAuthToken";
import BillPaymentHeader from "../Billpayment/BillPaymentHeader";
import {
  FaUser,
  FaMobileAlt,
  FaIdCard,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSpinner, // Importing loading spinner icon
} from "react-icons/fa";

import UseroldWaterBills from "./UserOldWaterbill";

const WaterBillPayment = ({ handleBackToSelection }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [waterUsage, setWaterUsage] = useState("");
  const [totalBill, setTotalBill] = useState(0);
  const [chargesPerLitre, setChargesPerLitre] = useState(0);
  const [creatingBill, setCreatingBill] = useState(false); // New state for creating bill

  const handlegetUser = async () => {
    if (inputValue.length === 6 || inputValue.length === 10) {
      setLoading(true);
      try {
        const authToken = await getAuthToken();
        const response = await axios.get(
          `http://localhost:5000/api/admin/userdetails/${inputValue}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setLoading(false);

        if (response.status === 200) {
          const data = response.data;
          setUserData(data);
          alert(`User found: ${data.name}`);
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

  const calculateTotalBill = (usage) => {
    let billAmount = 0;
    let charges = 0;
    switch (usage) {
      case "below_10000":
        charges = 0.04;
        billAmount = charges * 10000;
        break;
      case "10000-12000":
        charges = 0.05;
        billAmount = charges * 11000;
        break;
      case "above_12000":
        charges = 0.06;
        billAmount = charges * 12000;
        break;
      default:
        billAmount = 0;
        charges = 0;
        break;
    }
    setChargesPerLitre(charges);
    setTotalBill(billAmount);
  };

  const handleCreateBill = async () => {
    if (!waterUsage) {
      alert("Please select water usage to calculate the bill.");
      return;
    }

    const currentDate = new Date();

    const createMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const createDay = String(currentDate.getDate()).padStart(2, "0");
    const createYear = currentDate.getFullYear();
    const createDate = `${createDay}/${createMonth}/${createYear}`;

    const lastDate = new Date(currentDate);
    lastDate.setMonth(currentDate.getMonth() + 1);

    if (lastDate.getDate() !== currentDate.getDate()) {
      lastDate.setDate(0);
    }

    const lastMonth = String(lastDate.getMonth() + 1).padStart(2, "0");
    const lastDay = String(lastDate.getDate()).padStart(2, "0");
    const lastYear = lastDate.getFullYear();
    const formattedLastDate = `${lastDay}/${lastMonth}/${lastYear}`;

    const billData = {
      userId: userData.userId,
      amount: String(totalBill),
      lastDate: String(formattedLastDate),
      createDate: String(createDate),
      waterUsage: waterUsage,
      chargesPerLitre: String(chargesPerLitre),
      status: "unpaid",
    };

    console.log("The Bill Data is :", billData);

    setCreatingBill(true); // Start loading state for bill creation

    try {
      const authToken = await getAuthToken();
      const response = await axios.post(
        `http://localhost:5000/api/admin/waterbill`,
        billData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setCreatingBill(false); // End loading state for bill creation

      if (response.status === 201) {
        alert("Bill created successfully.");
      } else {
        alert("Failed to create the bill.");
      }
    } catch (err) {
      setCreatingBill(false); // End loading state for bill creation
      console.error("Error creating bill:", err);
      alert("Error creating bill. Please try again.");
    }
  };

  return (
    <div className="relative w-full p-4">
      <BillPaymentHeader
        title="Water Bill Payment"
        handleBackToSelection={handleBackToSelection}
      />
      <div className="flex justify-between mt-6 space-x-4">
        <div className="flex-1 bg-blue-100 shadow-md rounded-lg p-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Total Revenue Generated</h2>
            <h2 className="text-lg font-semibold">Total Bills Paid</h2>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-xl font-bold">₹50,000</p>
            <p className="text-xl font-bold">200</p>
          </div>
        </div>
        <div className="flex-1 bg-red-100 shadow-md rounded-lg p-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold">Revenue Pending</h2>
            <h2 className="text-lg font-semibold">Pending Bills</h2>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-xl font-bold">₹10,000</p>
            <p className="text-xl font-bold">50</p>
          </div>
        </div>
      </div>
      <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Create User Bill</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter 6-digit User ID or 10-digit Mobile Number"
            className="border border-gray-300 rounded p-2 flex-1"
            maxLength="10"
            pattern="\d*"
          />
          <button
            onClick={handlegetUser}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : "Get User"}
          </button>
        </div>
      </div>
      {userData && (
        <div>
        <div className="mt-8 p-6 bg-gray-100 shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-6">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaUser className="text-blue-500 mr-3" size={24} />
              <input
                type="text"
                value={userData.name}
                readOnly
                className="border border-gray-300 rounded p-2 w-full bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center">
              <FaIdCard className="text-blue-500 mr-3" size={24} />
              <input
                type="text"
                value={userData.userId}
                readOnly
                className="border border-gray-300 rounded p-2 w-full bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center">
              <FaMobileAlt className="text-blue-500 mr-3" size={24} />
              <input
                type="text"
                value={userData.mobileNumber}
                readOnly
                className="border border-gray-300 rounded p-2 w-full bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-blue-500 mr-3" size={24} />
              <input
                type="text"
                value={userData.email}
                readOnly
                className="border border-gray-300 rounded p-2 w-full bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-blue-500 mr-3" size={24} />
              <input
                type="text"
                value={userData.address}
                readOnly
                className="border border-gray-300 rounded p-2 w-full bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block mb-2">Water Usage:</label>
            <select
              onChange={(e) => {
                setWaterUsage(e.target.value);
                calculateTotalBill(e.target.value);
              }}
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="">Select Water Usage</option>
              <option value="below_10000">Below 10,000 Litre</option>
              <option value="10000-12000">10,000 - 12,000 Litre</option>
              <option value="above_12000">Above 12,000 Litre</option>
            </select>
          </div>
          {waterUsage && (
            <div className="mt-4">
              <h4 className="font-semibold">
                Total Bill Amount: ₹{totalBill.toFixed(2)}
              </h4>

              <h4 className="font-semibold">
                Charges per Liter: ₹{chargesPerLitre}
              </h4>
              
            </div>
            
          )}
          <button
            onClick={handleCreateBill}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={creatingBill}
          >
            {creatingBill ? (
              <div className="flex items-center">
                <FaSpinner className="animate-spin mr-2" />
                Creating Bill...
              </div>
            ) : (
              "Create Bill"
            )}
          </button>
          </div>
          <UseroldWaterBills userId={userData.userId} userName={userData.name} userEmail={userData.email} />

        </div>
      )}
    </div>
  );
};

export default WaterBillPayment;
