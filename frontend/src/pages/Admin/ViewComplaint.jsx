// src/pages/ViewComplaint.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase'; // Adjust import based on your setup
import LeftNavBar from '../../components/Admin/LeftNavBar '; // Adjust the path as necessary
import TopNavBar from '../../components/Admin/TopNavBar'; // Adjust the path as necessary
import ComplaintItem from '../../components/Admin/ViewComplaint/ComplaintItem'; // Import the new component

const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [completedComplaints, setCompletedComplaints] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);
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
        const response = await axios.get('http://localhost:5000/api/complaint', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("data is:", response);

        setComplaints(response.data);
        setTotalComplaints(response.data.length);
        setCompletedComplaints(response.data.filter(c => c.status === 'completed').length);
        setPendingComplaints(response.data.filter(c => c.status === 'pending').length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate]);

  const handleViewDetails = (complaintId) => {
    navigate(`/complaint/${complaintId}`);
  };

  const handleStatusUpdate = async (complaintId, newStatus, suggestion) => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();
      await axios.put(`http://localhost:5000/api/complaint/${complaintId}`, { 
        status: newStatus,
        suggestion: suggestion,
        notification: true // Set notification to true
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Status updated successfully');
      window.location.reload(); // Consider using state to update instead of reloading
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAccept = (complaintId) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint._id === complaintId
          ? { ...complaint, status: 'Action Taken', accepted: true } // Mark as accepted
          : complaint
      )
    );
  };

  if (loading) {
    return <p className="text-center">Loading complaints...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavBar />
      <div className="flex">
        <LeftNavBar />
        <div className="flex-grow flex flex-col items-center bg-gray-100 p-6">
          {/* Complaints Overview Section */}
          <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Complaints Overview</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-100 p-4 rounded-lg text-center shadow">
                <h3 className="text-lg font-semibold">Total Complaints</h3>
                <p className="text-2xl">{totalComplaints}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg text-center shadow">
                <h3 className="text-lg font-semibold">Completed Complaints</h3>
                <p className="text-2xl">{completedComplaints}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg text-center shadow">
                <h3 className="text-lg font-semibold">Pending Complaints</h3>
                <p className="text-2xl">{pendingComplaints}</p>
              </div>
            </div>
          </div>

          {/* Registered Complaints Section */}
          <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Registered Complaints</h2>
            {complaints.map(complaint => (
              <ComplaintItem 
                key={complaint._id}
                complaint={complaint}
                onAccept={handleAccept}
                onUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaint;
