import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../config/firebase';
import { AiOutlineBell } from 'react-icons/ai'; // Importing bell icon

const ComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('No user is logged in.');
        }

        const token = await user.getIdToken();

        const response = await axios.get('http://localhost:5000/api/complaint/user', { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaints(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        window.alert('Failed to fetch complaints: ' + (error.response?.data?.message || error.message));
        setLoading(false);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchComplaints();
  }, [navigate]);

  const handleComplaintClick = async (complaintId, notification) => {
    // Update the notification status in the backend
    if (notification) {
      try {
        const user = auth.currentUser;
        const token = await user.getIdToken();

        await axios.put(
          `http://localhost:5000/api/complaint/${complaintId}`,
          {
            notification: false, // Set notification to false
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error('Error updating notification:', error);
        alert('Failed to update notification: ' + (error.response?.data?.message || error.message));
      }
    }

    navigate(`/complaint-details/${complaintId}`);
  };

  const handleRegisterNewComplaint = () => {
    navigate('/complaint-registration');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Complaints</h2>
        
        <button 
          onClick={handleRegisterNewComplaint} 
          className="w-full mb-6 p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          aria-label="Register New Complaint"
        >
          Register New Complaint
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-40">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-blue-600 border-r-blue-600"></div>
            <p className="ml-4 text-lg mt-4 text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="complaint-list">
            {complaints.length === 0 ? (
              <p className="text-center text-lg text-gray-600">No complaints registered yet.</p>
            ) : (
              <ul className="space-y-4">
                {complaints.map((complaint) => (
                  <li 
                    key={complaint.id} 
                    className="p-6 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer relative"
                    onClick={() => handleComplaintClick(complaint.id, complaint.notification)} // Pass notification status
                  >
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {complaint.name} ({complaint.mobile})
                    </h3>
                    <p className="text-gray-600"><strong>Complaint ID:</strong> {complaint.complaintId}</p>
                    <p className="text-gray-600"><strong>Category:</strong> {complaint.category}</p>
                    <p className="text-gray-600"><strong>Description:</strong> {complaint.description}</p>
                    <p className="text-gray-600"><strong>Status:</strong> {complaint.status || "Complaint submitted to municipal corporation"}</p>

                    {/* Display notification count if notification exists and is true */}
                    {complaint.notification && complaint.notification === true && (
                      <span className="absolute top-4 right-4 flex items-center">
                        <AiOutlineBell className="text-red-500 text-3xl" title="Notification" />
                        <span className="bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold absolute -top-2 -right-2">
                          1
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintPage;
