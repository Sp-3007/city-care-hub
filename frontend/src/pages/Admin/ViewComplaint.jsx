import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase"; 
import LeftNavBar from "../../components/Admin/LeftNavBar "; 
import TopNavBar from "../../components/Admin/TopNavBar"; 
import ComplaintList from "../../components/Admin/ViewComplaint/ComplaintList"; 

const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [completedComplaints, setCompletedComplaints] = useState(0);
  const [underProcessComplaints, setUnderProcessComplaints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState("new"); // Track the current section
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("No user is logged in.");
        }

        const token = await user.getIdToken();
        const response = await axios.get(
          "http://localhost:5000/api/complaint",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const complaintsData = response.data;

        // Segregate complaints based on status
        const newComplaints = complaintsData.filter(c => !c.status);
        const underProcessComplaints = complaintsData.filter(c => c.status && c.status.toLowerCase() !== "completed");
        const completedComplaints = complaintsData.filter(c => c.status && c.status.toLowerCase() === "completed");

        setComplaints({ newComplaints, underProcessComplaints, completedComplaints });
        setTotalComplaints(complaintsData.length);
        setCompletedComplaints(completedComplaints.length);
        setUnderProcessComplaints(underProcessComplaints.length);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate]);

  const handleStatusUpdate = async (complaintId, newStatus, suggestion) => {
    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();
      await axios.put(
        `http://localhost:5000/api/complaint/${complaintId}`,
        {
          status: newStatus,
          suggestion: suggestion,
          notification: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Status updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status: " + (error.response?.data?.message || error.message));
    }
  };

  const handleAccept = (complaintId) => {
    setComplaints((prevComplaints) => ({
      ...prevComplaints,
      underProcessComplaints: prevComplaints.underProcessComplaints.map((complaint) =>
        complaint.complaintId === complaintId
          ? { ...complaint, status: "Action Taken", accepted: true }
          : complaint
      ),
    }));
  };

  if (loading) {
    return <p className="text-center">Loading complaints...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNavBar />
      <div className="flex">
        <LeftNavBar />
        <div className="flex-grow flex flex-col items-center bg-gray-100 p-6 mt-3" >
          <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Complaints Overview
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-100 p-4 rounded-lg text-center shadow">
                <h3 className="text-lg font-semibold">Total Complaints</h3>
                <p className="text-2xl">{totalComplaints}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg text-center shadow">
                <h3 className="text-lg font-semibold">Completed Complaints</h3>
                <p className="text-2xl">{completedComplaints}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg text-center shadow">
                <h3 className="text-lg font-semibold">Under Process Complaints</h3>
                <p className="text-2xl">{underProcessComplaints}</p>
              </div>
            </div>
          </div>
          
          {/* Section Control */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setCurrentSection("new")}
              className={`p-2 rounded-md ${currentSection === "new" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              New Complaints
            </button>
            <button
              onClick={() => setCurrentSection("underProcess")}
              className={`p-2 rounded-md ${currentSection === "underProcess" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Under Process Complaints
            </button>
            <button
              onClick={() => setCurrentSection("completed")}
              className={`p-2 rounded-md ${currentSection === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Completed Complaints
            </button>
          </div>

          {/* Display Complaints Based on Section */}
          {currentSection === "new" && (
            <ComplaintList
              complaints={complaints.newComplaints}
              title="New Complaints"
              onAccept={handleAccept}
              onUpdate={handleStatusUpdate}
            />
          )}
          {currentSection === "underProcess" && (
            <ComplaintList
              complaints={complaints.underProcessComplaints}
              title="Under Process Complaints"
              onAccept={handleAccept}
              onUpdate={handleStatusUpdate}
            />
          )}
          {currentSection === "completed" && (
            <ComplaintList
              complaints={complaints.completedComplaints}
              title="Completed Complaints"
              onAccept={handleAccept}
              onUpdate={handleStatusUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewComplaint;
