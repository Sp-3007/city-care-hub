// src/components/ComplaintItem.jsx

import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ComplaintItem = ({ complaint, onAccept, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(complaint.status);
  const [suggestion, setSuggestion] = useState('');

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleUpdate = () => {
    onUpdate(complaint._id, selectedStatus, suggestion);
  };

  return (
    <div key={complaint._id} className="border-b py-4 flex justify-between items-center hover:bg-gray-50 transition duration-200">
      <div className="flex-1">
        <h3 className="text-lg font-semibold cursor-pointer text-blue-600">
          {complaint.description}
        </h3>
        <p className="text-gray-600">Status: {complaint.status}</p>
      </div>
      <div className="flex items-center space-x-2">
        {complaint.accepted ? (
          <FaCheckCircle className="text-green-500" /> // Display checkmark if accepted
        ) : (
          <button
            onClick={() => onAccept(complaint._id)}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Accept
          </button>
        )}
        <select 
          value={selectedStatus === 'Action Taken' ? 'Action Taken' : ''} // Set the value based on acceptance
          onChange={handleStatusChange} 
          className="border p-2 rounded-md"
        >
          <option value="" disabled>Select Status</option>
          {['Action Taken', 'Pending', 'In Progress', 'On Hold', 'Completed'].map((status, index) => (
            <option key={index} value={status}>{status}</option>
          ))}
        </select>
        <input 
          type="text" 
          placeholder="Suggestions" 
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          className="border p-2 rounded-md"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default ComplaintItem;
