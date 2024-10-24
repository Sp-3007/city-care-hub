import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import { getAuthToken } from "../../../config/FirebaseAuthToken";
import emailjs from "emailjs-com";
import { FaSpinner } from "react-icons/fa"; // For spinner loader icon

const UseroldWaterBills = ({ userId, userName, userEmail }) => {
  const [waterBills, setWaterBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingBillId, setSendingBillId] = useState(null); // State for tracking which bill is sending

  useEffect(() => {
    const fetchWaterBills = async () => {
      setLoading(true);
      try {
        const authToken = await getAuthToken();
        const response = await axios.get(
          `http://localhost:5000/api/admin/waterbill/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("The old water bills are", response.data);

        if (Array.isArray(response.data)) {
          setWaterBills(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching water bills:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchWaterBills();
    }
  }, [userId]);

  const sendNotification = (bill) => {
    setSendingBillId(bill.billId); // Start loader for this specific bill

    const templateParams = {
      userName: userName,
      userId: bill.userId,
      billId: bill.billId,
      totalUsage: bill.waterUsage,
      chargesPerLiter: bill.chargesPerLitre || 0,
      amount: bill.amount,
      startDate: bill.startDate,
      lastDate: bill.lastDate,
      userEmail: userEmail,
    };

    // Send the email using EmailJS
    emailjs
      .send(
        "service_6yyhm22", // Replace with your EmailJS service ID
        "template_ceq6d5x", // Replace with your EmailJS template ID
        templateParams,
        "C19jNKN1hoO-aNZ0Y" // Replace with your EmailJS user ID (or public key)
      )
      .then((response) => {
        console.log("Email successfully sent!", response.status, response.text);
        alert(`Notification sent successfully for Bill ID: ${bill.billId}`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send notification.");
      })
      .finally(() => {
        setSendingBillId(null); // Reset the loader after sending
      });
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-6">Past Water Bills</h3>
      {loading ? (
        <p>Loading past bills...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {waterBills.length > 0 ? (
            waterBills.map((bill) => (
              <div key={bill.billId} className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-semibold">User: {bill.userName}</p>
                <p>User ID: {bill.userId}</p>
                <p>Amount: ₹{bill.amount}</p>
                <p>Status: {bill.status}</p>
                <p>Last Date: {bill.lastDate}</p>
                <button
                  onClick={() => sendNotification(bill)}
                  disabled={sendingBillId === bill.billId} // Disable only for this specific bill
                  className={`mt-4 px-4 py-2 rounded flex items-center ${
                    sendingBillId === bill.billId
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  {sendingBillId === bill.billId ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Sending...
                    </>
                  ) : (
                    <>
                      <FaBell className="mr-2" /> Send Notification
                    </>
                  )}
                </button>
              </div>
            ))
          ) : (
            <p>No past water bills found for this user.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UseroldWaterBills;
