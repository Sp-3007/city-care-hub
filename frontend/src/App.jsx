import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import useLocation from "./Hooks/useLocation";
import Spinner from "./components/Spinner"; // Import Spinner
import "./index.css";

const Home = lazy(() => import("./pages/Home"));
const RegisterComplaint = lazy(() => import("./pages/Complaint"));
const PlanCityVisit = lazy(() => import("./pages/PlanCityVisit"));
const Payment = lazy(() => import("./pages/Payment"));
const CityRulingParty = lazy(() => import("./pages/CityRulingParty"));
const UpcomingEvents = lazy(() => import("./pages/UpcomingEvents"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register")); // Import your Register component
const PrivateRoute = lazy(() => import("./Hooks/PrivateRoute"));
const UserProfile = lazy(()=>import("./pages/Userprofile"))
const ComplaintForm = lazy(() =>
  import("./components/Complaint/ComplaintForm")
);
const ComplaintDetails = lazy(() =>
  import("./components/Complaint/ComplaintDetails")
);

function App() {
  const { location, error } = useLocation();

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-2">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={<Home location={location} error={error} />}
            />

            {/* Protect all other routes with PrivateRoute */}
            <Route
              path="/complaint"
              element={
                <PrivateRoute>
                  <RegisterComplaint />
                </PrivateRoute>
              }
            />
            <Route
              path="/complaint-details/:complaintId"
              element={
                <PrivateRoute>
                  <ComplaintDetails />
                </PrivateRoute>
              }
            />

            <Route
              path="/complaint-registration"
              element={
                <PrivateRoute>
                  <ComplaintForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/plan-city-visit"
              element={
                <PrivateRoute>
                  <PlanCityVisit />
                  </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route path="/city-ruling-party" element={<CityRulingParty />} />
            <Route path="/upcoming-events" element={<UpcomingEvents />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
