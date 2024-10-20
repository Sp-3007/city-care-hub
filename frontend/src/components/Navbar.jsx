import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth); // Firebase authentication state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold">
          CityCare Hub
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`hidden md:flex space-x-4 ${isOpen ? "hidden" : "block"}`}
        >
          <Link
            to="/"
            className="text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/complaint"
            className="text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            Complaint Register
          </Link>
          <Link
            to="/plan-city-visit"
            className="text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            Plan City Visit
          </Link>
          <Link
            to="/payment"
            className="text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            Bill Payments
          </Link>
          <Link
            to="/city-ruling-party"
            className="text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            News
          </Link>
          <Link
            to="/upcoming-events"
            className="text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            Upcoming Events
          </Link>
          {user ? (
            <Link
              to="/profile"
              className="text-white text-lg hover:bg-purple-700 p-2 rounded-md"
            >
              <span className="material-icons">account_circle</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white text-lg hover:bg-purple-700 p-2 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-purple-600 p-4 space-y-4">
          <Link
            onClick={toggleMenu}
            to="/"
            className="block text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            Home
          </Link>
          <Link
            onClick={toggleMenu}
            to="/register-complaint"
            className="block text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            Complaint Register
          </Link>
          <Link
            onClick={toggleMenu}
            to="/plan-city-visit"
            className="block text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            Plan City Visit
          </Link>
          <Link
            onClick={toggleMenu}
            to="/payment"
            className="block text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            Bill Payments
          </Link>
          <Link
            onClick={toggleMenu}
            to="/city-ruling-party"
            className="block text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            News
          </Link>
          <Link
            onClick={toggleMenu}
            to="/upcoming-events"
            className="block text-white text-lg hover:bg-purple-700 p-2 rounded-md"
          >
            Upcoming Events
          </Link>
          {user ? (
            <Link
              to="/profile"
              className="text-white text-lg hover:bg-purple-700 p-2 rounded-md"
            >
              <span className="material-icons">account_circle</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white text-lg hover:bg-purple-700 p-2 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
