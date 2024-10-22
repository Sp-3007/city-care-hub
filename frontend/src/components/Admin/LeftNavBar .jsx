// LeftNavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUserCircle, FaSignOutAlt, FaHome, FaNewspaper, FaMoneyBillWave, FaUsers, FaChartBar, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

const LeftNavBar = () => {
  return (
    <nav className="w-64 h-screen bg-blue-300 text-white p-5 shadow-md mt-3">
      <h2 className="text-2xl font-bold mb-10">Navigation</h2>
      <ul>
        {[
          { name: 'Dashboard', icon: <FaHome className="inline mr-2" />, path: '/admin/dashboard' },
          { name: 'View Complaints', icon: <FaNewspaper className="inline mr-2" />, path: '/admin/viewcomplaints' },
          { name: 'Manage News', icon: <FaNewspaper className="inline mr-2" />, path: '/admin/newspage' },
          { name: 'Payment History', icon: <FaMoneyBillWave className="inline mr-2" />, path: '/payment-history' },
          { name: 'Manage Workers', icon: <FaUsers className="inline mr-2" />, path: '/manage-workers' },
          { name: 'Revenue Overview', icon: <FaChartBar className="inline mr-2" />, path: '/revenue-overview' },
        ].map((item) => (
          <li key={item.name} className="mb-4">
            <Link
              to={item.path} // Use the Link component from react-router-dom
              className="block p-2 rounded-md transition duration-200 hover:bg-blue-600 hover:shadow-md border border-transparent hover:border-blue-500 font-semibold"
              style={{ whiteSpace: 'nowrap' }}
            >
              {item.icon} {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex justify-center space-x-4">
        {/* Social Media Links */}
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-white text-2xl hover:text-blue-500" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-white text-2xl hover:text-blue-500" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-white text-2xl hover:text-blue-500" />
        </a>
      </div>
    </nav>
  );
};

export default LeftNavBar;
