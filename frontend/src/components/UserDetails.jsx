import React, { useEffect, useState } from "react";

const UserDetails = ({ userDetails, onDetailsChange }) => {
  const [location, setLocation] = useState("");

  const handleAutoFill = () => {
    // Fetch user's current location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Reverse geocoding can be done here to get the address from coordinates
        const generatedAddress = `${latitude}, ${longitude}`; // Simplified example, use a real address in production
        setLocation(generatedAddress);
        onDetailsChange({ ...userDetails, address: generatedAddress });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={userDetails.name}
          onChange={(e) =>
            onDetailsChange({ ...userDetails, name: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Mobile Number
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={userDetails.mobile}
          onChange={(e) =>
            onDetailsChange({ ...userDetails, mobile: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={userDetails.address || location}
            onChange={(e) =>
              onDetailsChange({ ...userDetails, address: e.target.value })
            }
          />
          <button
            type="button"
            className="py-1 px-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            onClick={handleAutoFill}
          >
            Auto-Fill
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
