import React from 'react';
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, googleProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      window.alert("Google login successful!");
      console.log(token)
      navigate("/"); // Redirect after successful login, adjust as needed
    } catch (error) {
      window.alert("Error with Google login: " + error.message);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      console.log("JWT Token:", token); // Print the JWT toke
      window.alert("Login successful!");
      navigate("/"); // Redirect after successful login, adjust as needed
    } catch (error) {
      window.alert("Error with email login: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email to reset your password:");
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        window.alert("Password reset email sent! Please check your inbox.");
      } catch (error) {
        window.alert("Error with password reset: " + error.message);
      }
    } else {
      window.alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="h-10 bg-gray-200"></div>

      <div className="w-full max-w-md p-6 mx-auto bg-white shadow-md rounded-lg mt-1">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
        Your Next Step to a Smarter City
        </h2>

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
          <div>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
          <div className="text-right">
            <button 
              type="button" 
              onClick={handleForgotPassword} 
              className="text-blue-600 hover:underline font-semibold">
              Forgot Password?
            </button>
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300">
            Login with Email
          </button>
        </form>

        <button onClick={handleGoogleLogin} className="w-full py-3 px-4 bg-white border border-gray-300 rounded-md mt-6 flex items-center justify-center shadow-sm hover:bg-gray-100 transition duration-300">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-5 h-5 mr-2" />
          <span className="text-gray-700 font-semibold">Login with Google</span>
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button 
            onClick={() => navigate('/register')} 
            className="text-blue-600 hover:underline font-semibold mt-1">
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
