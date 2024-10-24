import React, { useState } from "react";
import { auth } from "../config/firebase"; 
import { createUserWithEmailAndPassword , sendEmailVerification} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential= await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      
      // Success message
      window.alert("Registration successful! Please check your email for a verification link.");
     
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (error) {
      // Error message
      if (error.code === "auth/email-already-in-use") {
        window.alert("Email is already in use.");
      } else {
        window.alert("An error occurred. Please try again.");
      }
      setTimeout(() => navigate("/register"), 2000); // Redirect after 2 seconds
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Spacer for the navbar */}
      <div className="h-16 bg-gray-200"></div>

      <div className="w-full max-w-md p-6 mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <button 
            onClick={() => navigate('/login')} 
            className="text-blue-600 hover:underline font-semibold mt-1">
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
