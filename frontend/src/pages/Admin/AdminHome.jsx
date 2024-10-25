import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you have axios installed
import { auth } from "../../config/firebase"
import TopNavBar from "../../components/Admin/TopNavBar";
import LeftNavBar from "../../components/Admin/LeftNavBar ";

const quotes = [
  "The best way to predict the future is to create it.",
  "Believe you can and you're halfway there.",
  "Don't watch the clock; do what it does. Keep going.",
  "Opportunities don't happen, you create them.",
  "You miss 100% of the shots you don’t take.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Success is not in what you have, but who you are.",
  "Dream big and dare to fail.",
  "The only way to do great work is to love what you do.",
  "Your limitation—it's only your imagination.",
];

const AdminHomePage = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          alert("You must be logged in to submit a request.");
          return;
        }
        const token = await user.getIdToken();

        const response = await axios.get("http://localhost:5000/api/hireworker", {
          headers: {
             Authorization: `Bearer ${token}` , // Adjust as per your auth mechanism
          },
        });
        setUserRequests(response.data);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      }
    };

    fetchUserRequests();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      // Add your API call to accept the request
      await axios.patch(`/api/hireworker/${requestId}`, { accepted: true }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Update the local state to reflect the accepted status
      setUserRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === requestId ? { ...request, accepted: true } : request
        )
      );
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavBar />
      <div className="flex">
        <LeftNavBar />
        <main className="flex-1 p-6"> {/* Reduced padding */}
          <h1 className="text-3xl font-bold text-center mb-2"> {/* Reduced font size */}
            Welcome, Admin
          </h1>
          <p className="text-gray-600 text-sm mb-4 italic text-center"> {/* Reduced margin */}
            {randomQuote}
          </p>

          <section
            id="dashboard"
            className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
          >
            {/* Statistics Cards */}
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-200 hover:shadow-xl"> {/* Reduced padding */}
              <h2 className="text-xl font-semibold mb-2"> {/* Reduced font size */}
                Total Users
              </h2>
              <p className="text-3xl font-bold">150</p> {/* Reduced font size */}
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-200 hover:shadow-xl"> {/* Reduced padding */}
              <h2 className="text-xl font-semibold mb-2"> {/* Reduced font size */}
                Active Users
              </h2>
              <p className="text-3xl font-bold">120</p> {/* Reduced font size */}
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-200 hover:shadow-xl"> {/* Reduced padding */}
              <h2 className="text-xl font-semibold mb-2"> {/* Reduced font size */}
                Pending Complaints
              </h2>
              <p className="text-3xl font-bold">10</p> {/* Reduced font size */}
              <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition duration-200"> {/* Reduced padding */}
                View Complaints
              </button>
            </div>
          </section>

          {/* User Requests Section */}
          <section id="user-requests" className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              User Requests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRequests.map(request => (
                <div key={request.unique} className="bg-white shadow-lg rounded-lg p-4 transition duration-200 hover:shadow-xl">
                  <h3 className="text-lg font-semibold mb-2">
                    Request for {request.numberOfWorkers} Workers
                  </h3>
                  <p>Name: {request.name}</p>
                  <p>Email: {request.email}</p>
                  <p>Purpose: {request.purpose}</p>
                  <p>Address: {request.address}</p>
                  <p>Status: {request.accepted ? "Accepted" : "Pending"}</p>
                  {!request.accepted && (
                    <button
                    onClick={() => handleAcceptRequest(request._id, request.email, request)} // Pass request details
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition duration-200"
                  >
                    Accept Request
                  </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="notifications" className="mb-6"> {/* Reduced margin */}
            <h2 className="text-xl font-semibold mb-2"> {/* Reduced font size */}
              Notifications
            </h2>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-lg"> {/* Reduced padding */}
              <p>10 pending complaints need your attention!</p>
            </div>
          </section>

          {/* Management Sections in Inline Block Format */}
          <section
            id="management"
            className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
          >
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-200 hover:shadow-xl"> {/* Reduced padding */}
              <h2 className="text-xl font-semibold mb-2"> {/* Reduced font size */}
                Complaint Management
              </h2>
              <p>
                Total Complaints: <span className="font-bold">45</span>
              </p>
              <p>
                Pending Complaints: <span className="font-bold">10</span>
              </p>
              <p>
                Resolved Complaints: <span className="font-bold">35</span>
              </p>
              <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition duration-200"> {/* Reduced padding */}
                Manage Complaints
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-200 hover:shadow-xl"> {/* Reduced padding */}
              <h2 className="text-xl font-semibold mb-2"> {/* Reduced font size */}
                Revenue Management
              </h2>
              <p>
                Total Revenue Generated:{" "}
                <span className="font-bold">$10,000</span>
              </p>
              <p>
                Pending Revenue: <span className="font-bold">$2,000</span>
              </p>
              <p>
                Revenue Used: <span className="font-bold">$8,000</span>
              </p>
              <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition duration-200"> {/* Reduced padding */}
                View Payments
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-200 hover:shadow-xl"> {/* Reduced padding */}
              <h2 className="text-xl font-semibold mb-2"> {/* Reduced font size */}
                Job Requests
              </h2>
              <p>
                Total Requests: <span className="font-bold">5</span>
              </p>
              <p>
                Pending Requests: <span className="font-bold">3</span>
              </p>
              <p>
                Processed Requests: <span className="font-bold">2</span>
              </p>
              <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition duration-200"> {/* Reduced padding */}
                View Job Requests
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminHomePage;
