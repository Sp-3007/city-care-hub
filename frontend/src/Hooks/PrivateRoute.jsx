import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../config/firebase"; // Import your Firebase authentication instance

const PrivateRoute = ({ children }) => {
  // Using useAuthState to get the current user, loading state, and any errors
  const [user, loading, error] = useAuthState(auth);

  // Logging the user, loading, and error for debugging purposes
  useEffect(() => {
    console.log("User:", user);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [user, loading, error]);

  // If the authentication state is still loading, show a loading message
  if (loading) return <div>Loading...</div>;

  // If there is an error, show an error message
  if (error) return <div>Error: {error.message}</div>;

  // If the user is authenticated, render the children (protected components)
  // If the user is not authenticated, redirect to the login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
