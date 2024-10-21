import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase"; // assuming db is already initialized for Firestore
import { Link, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";

const UserProfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [pendingNotifications, setPendingNotifications] = useState(2); // Hardcoded for example
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    // Fetch additional user details from Firestore (assuming you store user data here)
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 relative">
        {/* Notification Icon */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <span className="material-icons text-gray-600 text-4xl">notifications</span>
            {pendingNotifications > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-600 text-white text-xs text-center">
                {pendingNotifications}
              </span>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-4">Profile</h1>

        <div className="flex items-center mb-4">
          {
            <img
              src="https://firebasestorage.googleapis.com/v0/b/my-project-sp2007.appspot.com/o/cropped_image.png?alt=media&token=c6b23b38-156c-4cee-a09b-8e5d4d2919de" // Using a placeholder image if no profile image is available
              alt="Default Profile"
              className="w-20 h-20 rounded-full mr-4"
            />
          }

          <div>
            <h2 className="text-xl font-semibold">{user?.displayName || "User Name"}</h2>
            <p className="text-gray-600">{user?.email || "user@example.com"}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Mobile Number:</h3>
          <p>8780313183</p> {/* Static value as requested */}
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Address:</h3>
          <p>D-913, Samras Boys Hostel, New Sama, Vadodra</p> {/* Static value as requested */}
        </div>

        {/* Additional information */}
        <div className="mb-4">
          <h3 className="font-semibold">Other Information:</h3>
          <p>Birthday: 01-01-1990</p> {/* Static value as requested */}
        </div>

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
