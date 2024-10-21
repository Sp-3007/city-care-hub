import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    setLoading(true);
    setMessage('');
    setError('');
    setModalOpen(false);

    try {
      // Use Firebase to sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      // Send the token to the backend to check for admin claims
      const response = await axios.post('http://localhost:5000/api/admin/loginadmin', { token });

      if (response.data.role === 'admin') {
        // Store the user in local storage for quick access
        localStorage.setItem('user', JSON.stringify(userCredential.user.reloadUserInfo));

        setMessage('Admin login successful!');
        navigate('/admin/dashboard');
      } else {
        setMessage('Unauthorized user');
      }
    } catch (error) {
      setMessage('Email or password is incorrect');
      console.error("Login error:", error);
    } finally {
      setLoading(false);
      setModalOpen(true);
    }
  };

  const handleForgotPassword = () => {
    const emailPrompt = prompt('Please enter your email for password reset');
    if (emailPrompt) {
      sendPasswordResetEmail(auth, emailPrompt)
        .then(() => {
          alert('Password reset link sent to your email.');
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <div className="flex justify-center mb-4">
          <AiOutlineUser className="text-5xl text-indigo-600" />
        </div>

        {/* Error Message Box */}
        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className={`w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg transition-all duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleAdminLogin}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              Logging in...
            </div>
          ) : (
            'Login'
          )}
        </button>

        <div className="mt-4 text-center">
          <button onClick={handleForgotPassword} className="text-indigo-600 hover:underline">
            Forgot Password?
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-sm w-full">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <AiOutlineClose className="text-2xl" />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-center">{message}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
