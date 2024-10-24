import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase"; // Assuming db is not needed here
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Add this import

const UserProfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [pendingNotifications, setPendingNotifications] = useState(2); // Hardcoded for example
  const navigate = useNavigate();

  // Function to extract display name from email
  const getDisplayNameFromEmail = (email) => {
    const namePart = email.split("@")[0].replace(/\d/g, ""); // Remove digits
    return namePart.charAt(0).toUpperCase() + namePart.slice(1); // Capitalize first letter
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const displayName =
          user.displayName ||
          (user.email ? getDisplayNameFromEmail(user.email) : "User");
        
        fetchUserData(user.uid); // Fetch user data with the user's uid
      } else {
        alert("User is not authenticated. Please log in.");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
      });

      if (response.status === 204) {
        alert("Please complete your profile.");
        setIsEditable(true); // Enable input fields if no data is found
      } else {
        const data = await response.json();
        if (data) {
          setUserData(data);
          setMobileNumber(data.mobileNumber || "");
          setAddress(data.address || "");
          setIsEditable(false); // Disable input fields if data is found
        }
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${user.uid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobileNumber,
            address,
            name: user.displayName || "User Name",
            email: user.email,
          }),
        }
      );

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Failed to submit profile:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const displayName =
    user?.displayName || (user?.email ? getDisplayNameFromEmail(user.email) : "User Name");

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 relative">
        {/* Notification Icon */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <span className="material-icons text-gray-600 text-4xl">
              notifications
            </span>
            {pendingNotifications > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-600 text-white text-xs text-center">
                {pendingNotifications}
              </span>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-4">Profile</h1>

        <div className="flex items-center mb-4">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/my-project-sp2007.appspot.com/o/cropped_image.png?alt=media&token=c6b23b38-156c-4cee-a09b-8e5d4d2919de"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            {/* Name and Email in separate lines */}
            <h2 className="text-xl font-semibold">{displayName}</h2>
            <p className="text-gray-600">{user?.email || "user@example.com"}</p>
          </div>
        </div>

        {/* Editable Fields for Mobile Number and Address */}
        <div className="mb-4">
          <label className="font-semibold">Mobile Number:</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            disabled={!isEditable}
            className={`block w-full mt-1 p-2 border ${
              isEditable ? "border-gray-300" : "border-gray-200 bg-gray-100"
            } rounded`}
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={!isEditable}
            className={`block w-full mt-1 p-2 border ${
              isEditable ? "border-gray-300" : "border-gray-200 bg-gray-100"
            } rounded`}
          />
        </div>

        {/* Submit Button to Save Profile */}
        {isEditable && (
          <div className="mb-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Profile
            </button>
          </div>
        )}

        {/* Settings Section */}
        <div className="border-t mt-6 pt-4">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <ul>
            <li className="mb-2">
              <Link
                to="/account-settings"
                className="text-blue-600 hover:underline"
              >
                Account Settings
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/privacy-settings"
                className="text-blue-600 hover:underline"
              >
                Privacy Settings
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/notification-settings"
                className="text-blue-600 hover:underline"
              >
                Notification Settings
              </Link>
            </li>
            <li>
              <button
                onClick={() => auth.signOut()}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
