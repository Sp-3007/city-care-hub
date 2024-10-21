// TopNavBar.jsx
import React from 'react';
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';

const TopNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.clear(); // Clear local storage
      navigate('/admin/loginadmin');
    } catch (error) {
      console.error('Logout Error: ', error);
    }
  };

  return (
    <header className="bg-blue-900 text-white p-5 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-bold">CityCareHub</h1>
      <div className="flex space-x-5 items-center">
        <div className="relative">
          <FaBell className="text-xl cursor-pointer hover:text-blue-300" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">2</span>
        </div>
        <FaUserCircle className="text-xl cursor-pointer hover:text-blue-300" />
        <FaSignOutAlt className="text-xl cursor-pointer hover:text-blue-300" onClick={handleLogout} />
      </div>
    </header>
  );
};

export default TopNavBar;