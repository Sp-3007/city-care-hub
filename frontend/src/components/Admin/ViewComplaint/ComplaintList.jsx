import React from 'react';
import ComplaintItem from './ComplaintItem';

const ComplaintList = ({ complaints, onAccept, onUpdate, title }) => {
  return (
    <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      {complaints.length === 0 ? (
        <p className="text-gray-600">No complaints to display</p>
      ) : (
        complaints.map(complaint => (
          <ComplaintItem
            key={complaint.complaintId}
            complaint={complaint}
            onAccept={onAccept}
            onUpdate={onUpdate}
          />
        ))
      )}
    </div>
  );
};

export default ComplaintList;
