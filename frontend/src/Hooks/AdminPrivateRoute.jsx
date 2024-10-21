import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
         
          const data = (() => {
            try {
              const customAttributes = JSON.parse(user.customAttributes);
              
              return customAttributes.admin === true;
            } catch (error) {
              console.error("Error parsing custom attributes:", error);
              return false;
            }
          })();

          setIsAdmin(data);
        } catch (err) {
          console.error("Error checking admin status:", err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      
      setCheckingAdmin(false);
    };

    checkAdmin();
  }, []);

  if (checkingAdmin) return <div>Loading...</div>;

  if (!isAdmin) {
    return <Navigate to="/admin/loginadmin" />;
  }

  return children;
};

export default AdminPrivateRoute;
