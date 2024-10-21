import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineUser, AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai'; // Close icon and loading icon
import { useNavigate } from 'react-router-dom'; // For navigation

const AdminAssign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const navigate = useNavigate(); // For navigation

  // Handle creating a new admin user
  const handleAdminCreation = async () => {
    setLoading(true);
    setMessage('');
    setModalOpen(false); // Close modal before sending a request

    try {
      const response = await axios.post('http://localhost:5000/api/admin/createadmin', {
        email,
        password,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
      setModalOpen(true); // Open modal to display message
    }
  };

  // Handle modal close and clearing inputs
  const handleCloseModal = () => {
    setModalOpen(false);
    setEmail(''); // Clear email input
    setPassword(''); // Clear password input
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Create Admin User</h2>

        <div className="flex justify-center mb-4">
          <AiOutlineUser className="text-5xl text-indigo-600" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className={`w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg transition-all duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleAdminCreation}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              Creating...
            </div>
          ) : (
            'Create Admin User'
          )}
        </button>
      </div>

      {/* Modal for Success/Error Message */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-sm w-full">
            {/* Close Icon */}
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <AiOutlineClose className="text-2xl" />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-center">{message}</h3>

            {/* Navigate to Admin Login */}
            <button
              onClick={() => navigate('/admin/loginadmin')}
              className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg"
            >
              Go to Admin Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAssign;
