// ComplaintRegistrationPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../config/firebase";
import { useDropzone } from "react-dropzone";
import CategorySelection from "../CategorySelection"; // Import the CategorySelection component

const ComplaintRegistrationPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null); // State for file upload
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState(""); // State for user's name
  const [mobile, setMobile] = useState(""); // State for user's mobile number
  const [address, setAddress] = useState(""); // State for user's address
  const [category, setCategory] = useState(""); // State for complaint category
  const [complaintId] = useState(generateComplaintId()); // Generate a random complaint ID
  const navigate = useNavigate();

  // Generate a random 6-digit complaint ID
  function generateComplaintId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Dropzone configuration
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file); // Store the actual file instead of the URL
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user is logged in.");
      }

      const token = await user.getIdToken();
      const formData = new FormData();
      formData.append("photo", uploadedFile); // Append the file to the form data
      formData.append("description", description);
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("address", address);
      formData.append("category", category); // Append selected category name
      formData.append("complaintId", complaintId); // Append complaint ID

      await axios.post("http://localhost:5000/api/complaint", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      window.alert("Complaint registered successfully!");
      navigate("/complaint"); // Redirect after successful submission
    } catch (error) {
      console.error("Error registering complaint:", error);
      window.alert(
        "Failed to register complaint: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // Conditional styling for top margin based on complaint presence
  const containerMarginTop = description || uploadedFile ? "mt-6" : "mt-1";

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 ${containerMarginTop}`}>
      <div className="max-w-4xl w-full p-6 bg-white shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Register a Complaint
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          {/* Mobile Number Input */}
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          {/* Address Input */}
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows="2"
            required
          ></textarea>

          {/* Category Selection */}
          <CategorySelection selectedCategory={category} onCategoryChange={setCategory}  />

          {/* Description Input */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description of the complaint"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 mt-4"
            rows="4"
            required
          ></textarea>

          {/* File Upload */}
          <div className="mb-6">
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition duration-200"
            >
              <input {...getInputProps()} />
              <p className="text-gray-600">
                Drag and drop a file here, or click to select a file
              </p>
            </div>
            {uploadedFile && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Uploaded File:</h3>
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt="Uploaded"
                  className="w-full h-auto mt-2 rounded-md shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintRegistrationPage;
