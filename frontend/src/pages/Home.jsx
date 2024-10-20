import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  return (
    <div className="text-center py-10 px-4 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Typing effect for the main heading */}
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        <TypeAnimation
          sequence={[
            'Welcome to CityCare Hub', // Type the text
            1000, // Wait for 1 second before erasing or looping
            '',  // Optionally erase the text (remove if not needed)
            () => {
              console.log('Typing finished'); // Callback when typing is complete
            }
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity} // Set to Infinity to keep looping
          style={{ display: 'inline-block' }}
        />
      </h1>

      <p className="text-lg text-gray-700 mb-12">
        Manage your city services efficiently and stay updated with the latest events.
      </p>

      {/* Functionality cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Functionality 1: Complain Registration */}
        <Link to="/complaint" className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50 transition">
          <img
            src="https://picsum.photos/400/300?random=1"
            alt="Complain Registration"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <h2 className="text-2xl font-semibold text-blue-600 mt-4">Complain Registration</h2>
          <p className="mt-2 text-gray-700">
            Easily register complaints about city issues like waste management, road damage, and more.
          </p>
        </Link>

        {/* Functionality 2: Plan City Visits */}
        <Link to="/plan-city-visit" className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50 transition">
          <img
            src="https://picsum.photos/400/300?random=2"
            alt="Plan City Visits"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <h2 className="text-2xl font-semibold text-blue-600 mt-4">Plan City Visits</h2>
          <p className="mt-2 text-gray-700">
            Explore the city and plan visits to various attractions and important sites.
          </p>
        </Link>

        {/* Functionality 3: Pay City Bills */}
        <Link to="/payment" className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50 transition">
          <img
            src="https://picsum.photos/400/300?random=3"
            alt="Pay City Bills"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <h2 className="text-2xl font-semibold text-blue-600 mt-4">Pay City Bills</h2>
          <p className="mt-2 text-gray-700">
            Conveniently pay for city services such as water, electricity, and property taxes.
          </p>
        </Link>

        {/* Functionality 4: City Events */}
        <Link to="/upcoming-events" className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50 transition">
          <img
            src="https://picsum.photos/400/300?random=4"
            alt="City Events"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <h2 className="text-2xl font-semibold text-blue-600 mt-4">City Events</h2>
          <p className="mt-2 text-gray-700">
            Stay informed about upcoming city events, festivals, and public gatherings.
          </p>
        </Link>

        {/* Functionality 5: City Current News */}
        <Link to="/city-ruling-party" className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50 transition">
          <img
            src="https://picsum.photos/400/300?random=5"
            alt="City Ruling Party"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <h2 className="text-2xl font-semibold text-blue-600 mt-4">City Current News</h2>
          <p className="mt-2 text-gray-700">
            Know the current news of the city and city development projects.
          </p>
        </Link>

        {/* Functionality 6: Hire Workers */}
        <Link to="/hire-workers" className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50 transition">
          <img
            src="https://picsum.photos/400/300?random=6"
            alt="Hire Workers"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <h2 className="text-2xl font-semibold text-blue-600 mt-4">Hire Workers</h2>
          <p className="mt-2 text-gray-700">
            Hire professionals to clean your house, garden, or any other area in the city.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
