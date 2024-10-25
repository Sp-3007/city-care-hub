import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure you have axios installed
import { auth } from '../config/firebase'; // Import Firebase authentication

const HireWorkers = () => {
  const [formData, setFormData] = useState({
    purpose: '',
    numberOfWorkers: '',
    hoursNeeded: '',
    name: '',
    email: '', // Change this to email
    address: ''
  });
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    try {
      // Get the current user's ID token
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to submit a request.");
        return;
      }
      const token = await user.getIdToken();

      // Send a POST request to the backend with authorization header
      const response = await axios.post('http://localhost:5000/api/hireworker', {
        ...formData,
        accepted: false // Send accepted as false to the backend
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Include the authorization header
        }
      });

      if (response.status === 200) {
        alert("Request submitted successfully!");
        navigate('/'); // Redirect back to home page after submission
      }
    } catch (error) {
      console.error("Error submitting request: ", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105">
      <h1 className="text-3xl font-bold text-center mb-4">Request a Helper</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="purpose">Purpose of Hiring</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 transition duration-200 ease-in-out focus:border-blue-600"
          >
            <option value="">Select Purpose</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Gardening">Gardening</option>
            <option value="Repairs">Repairs</option>
            <option value="Cooking">Cooking</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="numberOfWorkers">Number of Workers Needed</label>
          <input
            type="number"
            name="numberOfWorkers"
            value={formData.numberOfWorkers}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 transition duration-200 ease-in-out focus:border-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="hoursNeeded">Number of Hours Needed</label>
          <input
            type="number"
            name="hoursNeeded"
            value={formData.hoursNeeded}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 transition duration-200 ease-in-out focus:border-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 transition duration-200 ease-in-out focus:border-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label> {/* Change label to email */}
          <input
            type="email" // Change input type to email
            name="email" // Ensure name is set to email
            value={formData.email} // Change value to formData.email
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 transition duration-200 ease-in-out focus:border-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 transition duration-200 ease-in-out focus:border-blue-600"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Disable the button if loading
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-4 border-t-4 border-white rounded-full mx-auto"></div>
          ) : (
            'Submit Request'
          )}
        </button>
      </form>
    </div>
  );
};

export default HireWorkers;
