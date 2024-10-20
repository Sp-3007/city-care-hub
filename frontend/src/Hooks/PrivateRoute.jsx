import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../config/firebase";

const PrivateRoute = ({ children }) => {
  // Get authentication state from Firebase
  const [user, loading, error] = useAuthState(auth);

  // Log the response from useAuthState for debugging purposes
  useEffect(() => {
    console.log("User:", user);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [user, loading, error]);

  // Display a loading message while the authentication state is being determined
  if (loading) return <div>Loading...</div>;

  // Display an error message if there is an issue with authentication
  if (error) return <div>Error: {error.message}</div>;

  // If the user is authenticated, render the children components; otherwise, redirect to the login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
