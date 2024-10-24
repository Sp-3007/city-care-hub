import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../../Hooks/Spinner";
import AdminPrivateRoute from "../../Hooks/AdminPrivateRoute"; // Import AdminPrivateRoute

const AdminAssign = lazy(() => import("./CreateAdmin"));
const AdminLogin = lazy(() => import("./LoginAdmin"));
const AdminHomePage = lazy(() => import("./AdminHome"));
const ViewComplaint = lazy(() => import("./ViewComplaint"));
const AdminNewsPage = lazy(() => import("./AdminNewsPage"));
const AdminBillManagement = lazy(() => import("./Billmanagement"));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Public routes for admin login and admin creation */}
        <Route path="/createadmin" element={<AdminAssign />} />
        <Route path="/loginadmin" element={<AdminLogin />} />

        {/* Protected admin route using AdminPrivateRoute */}
        <Route
          path="/dashboard"
          element={
            <AdminPrivateRoute>
              <AdminHomePage />
            </AdminPrivateRoute>
          }
        />

        {/* Protected admin route using ComplainView */}

        <Route
          path="/viewcomplaints"
          element={
            <AdminPrivateRoute>
              <ViewComplaint />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/newspage"
          element={
            <AdminPrivateRoute>
              <AdminNewsPage />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/billmanagement"
          element={
            <AdminPrivateRoute>
              < AdminBillManagement/>
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
