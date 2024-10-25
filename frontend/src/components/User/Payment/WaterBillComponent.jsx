import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../../config/firebase"; // Import Firebase auth
import { FaBell } from "react-icons/fa"; // Import notification icon
import { QRCodeCanvas } from "qrcode.react"; // Import QR code canvas library
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const Payment = () => {
  const [waterBills, setWaterBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [currentBillId, setCurrentBillId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchUserBills = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          setError("User not authenticated.");
          return;
        }

        const token = await user.getIdToken();
        if (!token) {
          setError("Failed to fetch token. Please login again.");
          return;
        }

        const userId = user.uid;

        const response = await axios.get(
          `http://localhost:5000/api/user/waterbill/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { waterBills } = response.data;
        setWaterBills(waterBills);
      } catch (error) {
        console.error("Error fetching water bills:", error);
        setError("Error fetching water bills.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBills();
  }, []);

  const handlePayBill = (billId) => {
    setCurrentBillId(billId);
    setShowPaymentModal(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentInProgress(true);
      updateBillStatus(billId);
    }, 2000); // Show payment modal for 2 seconds before updating status
  };

  const updateBillStatus = async (billId) => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();

      await axios.patch(
        `http://localhost:5000/api/user/waterbill/${billId}`,
        { status: "paid" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPaymentInProgress(false);
      toast.success("Payment Successful!", {
        position: "top-right",
        autoClose: 3000, // Toast will disappear after 3 seconds
      });
      fetchUserBills(); // Refresh the bills after payment
    } catch (error) {
      console.error("Error updating bill status:", error);
    }
  };

  // Separate paid and unpaid bills
  const paidBills = waterBills.filter((bill) => bill.status === "paid");
  const unpaidBills = waterBills.filter((bill) => bill.status === "unpaid");

  if (loading) {
    return <div>Loading water bills...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8 text-center">Your Water Bills</h2>

      {/* Bills Container */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-300 mx-auto">
        {/* Pending Bills Section */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Pending Bills</h3>
          {unpaidBills.length === 0 ? (
            <div className="text-center text-gray-600 text-lg font-semibold">
              As a good citizen, you pay all due taxes. No pending bills available!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center">
              {unpaidBills.map((bill) => (
                <div
                  key={bill.billId}
                  className="p-6 border rounded-md shadow-lg bg-orange-50 hover:bg-blue-100 transition duration-200"
                >
                  <p className="text-gray-900">Amount: ₹{bill.amount}</p>
                  <p className="text-gray-900">Water Usage: {bill.waterUsage}</p>
                  <p className="text-gray-900">
                    Charges Applied: {bill.chargesPerLitre}
                  </p>
                  <p className="text-gray-900">Status: {bill.status}</p>
                  <p className="text-gray-900">Last Date: {bill.lastDate}</p>

                  <FaBell
                    className="absolute top-3 right-3 text-blue-500"
                    title="Notification"
                  />
                  <button
                    onClick={() => handlePayBill(bill.billId)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                  >
                    Pay Bill
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-300 mx-auto">

        {/* Paid Bills Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-center">Paid Bills</h3>
          {paidBills.length === 0 ? (
            <div className="text-center text-gray-600 text-lg font-semibold">
              No paid bills are available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center">
              {paidBills.map((bill) => (
                <div
                  key={bill.billId}
                  className="p-6 border rounded-md shadow-lg bg-green-50 hover:bg-green-100 transition duration-200"
                >
                  <h3 className="text-lg font-semibold">User ID: {bill.userId}</h3>
                  <p className="text-gray-900">Amount: ₹{bill.amount}</p>
                  <p className="text-gray-900">Status: {bill.status}</p>
                  <p className="text-gray-900">Bill Date: {bill.createDate}</p>
                  <p className="text-gray-900">Water Usage: {bill.waterUsage}</p>
                  <p className="text-gray-900">
                    Charges Applied: {bill.chargesPerLitre}
                  </p>

                  <FaBell
                    className="absolute top-3 right-3 text-blue-500"
                    title="Notification"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && currentBillId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Scan & Pay Using UPI</h3>
            {/* QR Code for payment */}
            <QRCodeCanvas
              value={`upi://pay?pa=yourupiid@upi&pn=YourName&mc=1234&tid=1234567890&am=${unpaidBills.find(bill => bill.billId === currentBillId).amount}&tid=yourtransactionid`}
              size={256}
            />
            <div className="mt-4 text-lg">Making Payment...</div>
            {paymentInProgress && <div className="loader">Loading...</div>}
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Payment;
