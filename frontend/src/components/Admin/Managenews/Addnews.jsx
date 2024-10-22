import React, { useState } from 'react';
import { getAuthToken } from '../../../config/FirebaseAuthToken'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNews = ({ onNewsAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [capturedBy, setCapturedBy] = useState('');
  const [photo, setPhoto] = useState(null); // File for the news photo
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(''); // Success message
  const [errorMessage, setErrorMessage] = useState(''); // Error message

  // Function to validate all required fields
  const validateForm = () => {
    if (!title || !description || !capturedBy) {
      setErrorMessage('Please fill in all required fields.'); // Show error if any field is missing
      return false;
    }
    return true;
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing error message

    // Validate required fields before proceeding
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    setLoading(true); // Start loading state
    setSuccessMessage(''); // Clear previous success message
    
    const authToken = await getAuthToken(); // Fetching the JWT token

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('capturedBy', capturedBy);
    formData.append('date', new Date().toISOString());
    formData.append('views', 0); // Initially set to 0 views
    if (photo) {
      formData.append('photo', photo); // Append photo file if present
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/news', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData, // Send as FormData to handle file uploads
      });

      if (response.ok) {
        setSuccessMessage('News added successfully!'); // Set success message
        onNewsAdded(); // Call the callback to switch back to the news list
        toast.success("News Added successfully", {
          position: "top-right",
          autoClose: 3000,
          style: { backgroundColor: "#2196F3", color: "#FFFFFF" }, 
        });
        setTitle('');
        setDescription('');
        setCapturedBy('');
        setPhoto(null); // Reset form fields after successful submission
      } else {
        setErrorMessage('Failed to add news. Please try again.');
      }
    } catch (error) {
      console.error('Error adding news:', error);
      setErrorMessage('Error adding news. Please try again.');
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 mb-6 relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New News</h2>

      {/* Success Message Popup */}
      {successMessage && (
        <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-center py-2">
          {successMessage}
        </div>
      )}

      {/* Error Message Popup */}
      {errorMessage && (
        <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-center py-2">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Captured By <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={capturedBy}
            onChange={(e) => setCapturedBy(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Photo (Optional)
          </label>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            accept="image/*"
          />
        </div>

        {/* Submit Button with Simple Loading Spinner */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200 flex items-center"
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <>
              <div className="loader border-t-transparent border-solid animate-spin rounded-full border-white border-4 h-5 w-5 mr-3"></div>
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>

      {/* Spinner Style */}
      <style>{`
        .loader {
          border-top-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default AddNews;
