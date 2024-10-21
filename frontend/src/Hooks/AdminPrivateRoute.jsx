import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase"; // Adjust Firebase import based on your setup

const AdminPrivateRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch or use admin claims stored locally
          const token = await user.getIdTokenResult();
          
          // Check if the user has admin claims
          if (token.claims.admin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("Error checking admin status:", err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setCheckingAuth(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <div>Loading...</div>;

  if (!isAdmin) {
    return <Navigate to="/admin/loginadmin" />;
  }

  return children;
};

export default AdminPrivateRoute;
