import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../../config/firebase';

const ComplaintDetailsPage = () => {
  const { complaintId } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('No user is logged in.');
        }

        const token = await user.getIdToken();

        const response = await axios.get(`http://localhost:5000/api/complaint/${complaintId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaint(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching complaint details:', error);
        window.alert('Failed to fetch complaint details: ' + (error.response?.data?.message || error.message));
        setLoading(false);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchComplaintDetails();
  }, [complaintId, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this complaint? This will remove it permanently from the municipal corporation's records.");
    if (!confirmDelete) return;

    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();
      await axios.delete(`http://localhost:5000/api/complaint/${complaintId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.alert('Complaint deleted successfully.');
      navigate('/'); // Redirect to the desired page after deletion
    } catch (error) {
      console.error('Error deleting complaint:', error);
      window.alert('Failed to delete complaint: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-blue-600 border-r-blue-600"></div>
        <p className="ml-4 text-lg mt-4 text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!complaint) {
    return <p className="text-center text-lg text-gray-600">Complaint not found.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Complaint Details</h2>
        
        <p className="text-lg mb-2"><strong>Complaint ID:</strong> {complaint.complaintId}</p>
        <p className="text-lg"><strong>Category:</strong> {complaint.category}</p>
        <p className="text-lg"><strong>Name:</strong> {complaint.name}</p>
        <p className="text-lg"><strong>Mobile:</strong> {complaint.mobile}</p>
        <p className="text-lg"><strong>Address:</strong> {complaint.address}</p>
        <p className="text-lg"><strong>Description:</strong> {complaint.description}</p>
        
        {/* Status with default message if undefined */}
        <p className="text-lg"><strong>Status:</strong> {complaint.status || "Complaint submitted to municipal corporation"}</p>

        {complaint.photoUrl && (
          <div className="w-40 h-40 overflow-hidden rounded-md shadow-sm mt-4">
            <img 
              src={complaint.photoUrl} 
              alt="Complaint" 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Conditionally render suggestion/reply from municipal corporation */}
        {complaint.suggestion && (
          <div className="bg-gray-100 rounded-md shadow-sm p-4 mt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Reply from Municipal Corpo:</h3>
            <p className="text-lg text-gray-600">{complaint.suggestion}</p>
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 mr-10"
        >
          Go Back
        </button>

        <button
          onClick={handleDelete}
          className="mt-4 bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition duration-200"
        >
          Delete Complaint
        </button>
      </div>
    </div>
  );
};

export default ComplaintDetailsPage;
