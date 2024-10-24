import React, { useState } from 'react';
import { auth, db } from '../../../config/firebase';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineHome } from 'react-icons/ai';

const ProfileCompletionModal = ({ user, onComplete }) => {
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const userRef = doc(db, "users", user.uid);

    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      setLoading(false);
      return;
    }

    try {
      await setDoc(userRef, {
        mobile: mobile,
        address: address,
      }, { merge: true });

      window.alert("Profile updated successfully!");
      onComplete(); // Notify parent component to close the modal and reset state
      navigate("/"); // Redirect to the main page
    } catch (error) {
      setError("Error updating profile: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          A Few More Steps to Know You Better!
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <AiOutlineUser className="mr-2 text-gray-500" />
              Name
            </label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <AiOutlineMail className="mr-2 text-gray-500" />
              Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <AiOutlinePhone className="mr-2 text-gray-500" />
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <AiOutlineHome className="mr-2 text-gray-500" />
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className={`w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ${loading && 'opacity-50 cursor-not-allowed'}`} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <button onClick={onComplete} className="text-blue-600 hover:underline">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;
