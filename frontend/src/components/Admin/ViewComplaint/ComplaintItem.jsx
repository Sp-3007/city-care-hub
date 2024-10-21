import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import PerticularComplaintDetails from "../ViewComplaint/PerticularComplaintDetails"; // Import the new component

const ComplaintItem = ({ complaint, onAccept, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(complaint.status || "");
  const [suggestion, setSuggestion] = useState("");
  const [accepted, setAccepted] = useState(complaint.accepted || false);
  const [showDetails, setShowDetails] = useState(false); // State to toggle details

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleAccept = () => {
    setAccepted(true);
    setSelectedStatus("Action Taken");
    onAccept(complaint.complaintId);
  };

  const handleUpdate = () => {
    onUpdate(complaint.complaintId, selectedStatus, suggestion);
  };

  return (
    <div
      key={complaint.complaintId}
      className="bg-white border rounded-md shadow-lg mb-4 p-4 flex flex-col justify-between hover:bg-gray-100 transition duration-200" // Updated styles
    >
      <div className="flex-1">
        <h3
          className="text-lg font-semibold cursor-pointer text-blue-600"
          onClick={() => setShowDetails(!showDetails)} // Toggle details on description click
        >
          {complaint.description}
        </h3>
        <p className="text-gray-600">Status: {selectedStatus || "No Status"}</p>
        
        {/* Conditionally render the details below the description */}
        {showDetails && <PerticularComplaintDetails complaint={complaint} />}
      </div>

      <div className="flex items-center space-x-2 mt-4">
        {accepted ? (
          <FaCheckCircle className="text-green-500" />
        ) : !selectedStatus ? (
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Accept
          </button>
        ) : null}

        {/* Only render dropdown and suggestion input if the status is not 'Completed' */}
        {selectedStatus !== "Completed" && (
          <>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="border p-2 rounded-md"
              disabled={accepted && selectedStatus === "Action Taken"}
            >
              <option value="" disabled>
                Select Status
              </option>
              {["Action Taken", "Pending", "In Progress", "On Hold", "Completed"].map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Add suggestion"
              className="border p-2 rounded-md"
            />
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ComplaintItem;
