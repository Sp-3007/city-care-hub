// controllers/userController.js
const { admin, db } = require("../../../config/firebaseAdmin");

const { v4: uuidv4 } = require("uuid"); 


const getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    // Check if userDoc exists
    if (!userDoc.exists) {
      // Send a 204 No Content response if the user is not found
      return res.status(204).send();
    }

    // If userDoc exists, send the user data
    res.json(userDoc.data());
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
};



// POST endpoint to store user profile data
const updateUserProfile = async (req, res) => {
  const userIdFromRequest = req.params.userId;
  const { name, email, mobileNumber, address } = req.body; // Extract data from request body

  try {
    // Generate a 6-digit unique numerical value for userId
    const userId = String(Math.floor(100000 + Math.random() * 900000));

    // Reference to the Firestore user document
    const userRef = db.collection("users").doc(userIdFromRequest);

    // User data to store/update
    const userData = {
      name,
      email,
      mobileNumber : Number(mobileNumber),
      address,
      billingInfo: [], 
      userId: userId,
    };

    
    await userRef.set(userData, { merge: true }); 

    res.status(200).json({ message: "User profile updated successfully." });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Failed to update user profile." });
  }
};


module.exports = { getUserById, updateUserProfile };
