const { db } = require("../config/firebaseAdmin");
const { getStorage } = require("firebase-admin/storage"); // Firebase storage
const { v4: uuidv4 } = require("uuid"); // To generate unique names for photo files

const registerComplaint = async (req, res) => {
  try {
    const userId = req.user.uid; // Get the user ID from the authenticated request

    // Extract complaint data from the request body
    const { category, name, mobile, address, description } = req.body;

    // Get the photo file from multer middleware
    const photo = req.file;

    // Initialize the photoUrl variable
    let photoUrl = null;

    // If a photo is provided, upload it to Firebase Storage
    if (photo) {
      const bucket = getStorage().bucket(); // Get the default storage bucket
      const photoFileName = `public/${uuidv4()}-${photo.originalname}`; // Generate a unique name for the photo
      const file = bucket.file(photoFileName); // Create a reference to the file in the bucket

      // Upload the photo to Firebase Storage
      await file.save(photo.buffer, {
        metadata: {
          contentType: photo.mimetype,
        },
      });

      // Make the file publicly accessible
      await file.makePublic();

      // Generate the public URL for the uploaded photo
      photoUrl = `https://storage.googleapis.com/${bucket.name}/${photoFileName}`;
    }

    // Generate a random 8-digit complaint ID
    const complaintId = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();

    // Create a new complaint object
    const newComplaint = {
      category,
      name,
      mobile,
      address,
      description,
      photoUrl, // Store the photo URL
      complaintId, // Store the generated 8-digit complaint ID
      createdAt: new Date().toISOString(), // Timestamp of the complaint
    };

    // Save the complaint to Firestore
    const complaintsRef = db
      .collection("complaints")
      .doc(userId)
      .collection("user_complaint");

    await complaintsRef.add(newComplaint);

    res
      .status(200)
      .json({ message: "Complaint registered successfully", complaintId });
  } catch (error) {
    console.error("Error registering complaint:", error);
    res.status(500).json({ error: "Failed to register complaint" });
  }
};

// Existing function to get complaints
const getdata = async (req, res) => {
  try {
    const userId = req.user.uid;
    const complaintsRef = db
      .collection("complaints")
      .doc(userId)
      .collection("user_complaint");

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

const getComplaintDetails = async (req, res) => {
  try {
    const userId = req.user.uid; // Get the user ID from the authenticated user
    const complaintId = req.params.complaintId; // Get the complaint ID from the request parameters

    // Reference to the specific complaint document
    const complaintRef = db
      .collection("complaints")
      .doc(userId)
      .collection("user_complaint")
      .doc(complaintId);

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
    const userId = req.user.uid; // Get the user ID from the authenticated request
    const complaintId = req.params.complaintId; // Get the complaint ID from the request parameters

    // Reference to the specific complaint document
    const complaintRef = db
      .collection("complaints")
      .doc(userId)
      .collection("user_complaint")
      .doc(complaintId);

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

module.exports = {
  getdata,
  registerComplaint,
  getComplaintDetails,
  deleteComplaint,
};