import React from 'react';

const PerticularComplaintDetails = ({ complaint }) => {
  return (
    <div className="border-b py-4 mt-2">
      <p className="text-lg mb-2"><strong>Complaint ID:</strong> {complaint.complaintId}</p>
      <p className="text-lg mb-2"><strong>Category:</strong> {complaint.category}</p>
      <p className="text-lg mb-2"><strong>Name:</strong> {complaint.name}</p>
      <p className="text-lg mb-2"><strong>Mobile:</strong> {complaint.mobile}</p>
      <p className="text-lg mb-2"><strong>Address:</strong> {complaint.address}</p>
      <p className="text-lg mb-2"><strong>Description:</strong> {complaint.description}</p>
      <p className="text-lg mb-2"><strong>Status:</strong> {complaint.status || "Complaint submitted to municipal corporation"}</p>
      {complaint.photoUrl && (
        <div className="w-40 h-40 overflow-hidden rounded-md shadow-sm mt-4">
          <img 
            src={complaint.photoUrl} 
            alt="Complaint" 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
    </div>
  );
};

export default PerticularComplaintDetails;
