const { db } = require("../../config/firebaseAdmin");
const { v4: uuidv4 } = require("uuid"); // To generate unique names for photo files

const registerComplaint = async (req, res) => {
  try {
    const userId = req.user.uid; // Get the user ID from the authenticated request

    // Extract complaint data from the request body
    const { category, name, mobile, address, description} = req.body;

    // Get the photo file from multer middleware
    const photoUrl = req.photoUrl;
    
    // Generate a random 8-digit complaint ID
    const complaintId = uuidv4(); // Use UUID for unique complaint ID

    // Create a new complaint object
    const newComplaint = {
      userId, // Store the user ID
      category,
      name,
      mobile,
      address,
      description,
      photoUrl, // Store the photo URL
      complaintId, // Store the generated complaint ID
      createdAt: new Date().toISOString(), // Timestamp of the complaint
    };

    // Save the complaint to Firestore
    const complaintsRef = db.collection("complaints").doc(complaintId);

    await complaintsRef.set(newComplaint); // Use set() to store with complaintId

    res
      .status(200)
      .json({ message: "Complaint registered successfully", complaintId });
  } catch (error) {
    console.error("Error registering complaint:", error);
    res.status(500).json({ error: "Failed to register complaint" });
  }
};

// Existing function to get complaints for admin
const getdata = async (req, res) => {
  try {
    const complaintsRef = db.collection("complaints");
    const snapshot = await complaintsRef.get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const complaints = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
};

// Function to get complaints by user ID (for users)
const getUserComplaints = async (req, res) => {
  try {
    const userId = req.user.uid; // Get the user ID from the authenticated user
    const complaintsRef = db.collection("complaints");
    const snapshot = await complaintsRef.where("userId", "==", userId).get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const complaints = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    res.status(500).json({ error: "Failed to fetch user complaints" });
  }
};

const getComplaintDetails = async (req, res) => {
  try {
    const complaintId = req.params.complaintId; // Get the complaint ID from the request parameters

    // Reference to the specific complaint document
    const complaintRef = db.collection("complaints").doc(complaintId);
    const complaintDoc = await complaintRef.get();

    // Check if the complaint exists
    if (!complaintDoc.exists) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Send back the complaint data
    const complaintData = {
      id: complaintDoc.id,
      ...complaintDoc.data(),
    };

    res.status(200).json(complaintData);
  } catch (error) {
    console.error("Error fetching complaint details:", error);
    res.status(500).json({ error: "Failed to fetch complaint details" });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const complaintId = req.params.complaintId; // Get the complaint ID from the request parameters

    // Reference to the specific complaint document
    const complaintRef = db.collection("complaints").doc(complaintId);

    // Check if the complaint exists before deleting
    const complaintDoc = await complaintRef.get();
    if (!complaintDoc.exists) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Delete the complaint document
    await complaintRef.delete();

    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ error: "Failed to delete complaint" });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const complaintId = req.params.complaintId; // Get the complaint ID from the request parameters
    const { status, suggestion, notification } = req.body; // Extract data from request body

    // Reference to the specific complaint document
    const complaintRef = db.collection("complaints").doc(complaintId);

    // Check if the complaint exists
    const complaintDoc = await complaintRef.get();
    if (!complaintDoc.exists) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Update only the fields that are passed in the request body
    const updateData = {};
    if (status) updateData.status = status;
    if (suggestion) updateData.suggestion = suggestion;
    if (notification !== undefined) updateData.notification = notification;

    // Update the complaint in Firestore
    await complaintRef.update(updateData);

    res.status(200).json({ message: "Complaint updated successfully" });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ error: "Failed to update complaint" });
  }
};

module.exports = {
  getdata,
  registerComplaint,
  getUserComplaints,
  getComplaintDetails,
  deleteComplaint,
  updateComplaint, // Export the update function
};