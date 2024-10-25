const { db, admin } = require("../../config/firebaseAdmin");

// Function to handle hire requests
const hireWorker = async (req, res) => {
  const { purpose, numberOfWorkers, hoursNeeded, name, email, address } =
    req.body;
  const userId = req.user.uid; // Assuming you attach the user ID after token verification
  const unique = Math.floor(1000 + Math.random() * 9000);

  try {
    // Step 1: Create the hire request document
    const hireData = {
      purpose,
      numberOfWorkers,
      hoursNeeded,
      name,
      email,
      address,
      userId, // Store user ID directly in the hire request document
      accepted: false, // Initial accepted status
      createdAt: admin.firestore.FieldValue.serverTimestamp(), // Store creation time
      unique : String(unique)
    };

    // Step 2: Add the new hire request to the hireworkers collection
    const hireDocRef = await db.collection("hireworkers").add(hireData);

    // Step 3: Respond with success
    res.status(201).json({
      message: "Hire request submitted successfully",
      hireId: hireDocRef.id, // Return the ID of the created hire request
    });
  } catch (error) {
    console.error("Error submitting hire request:", error);
    res.status(500).json({ message: "Failed to submit hire request" });
  }
};

// Function to retrieve all hire requests
const getAllHireRequests = async (req, res) => {
  try {
    // Step 1: Get all hire requests from Firestore
    const hireRequestsSnapshot = await db.collection("hireworkers").get();

    // Step 2: Map through the snapshot and extract data
    const hireRequests = hireRequestsSnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }));

    // Step 3: Respond with the hire requests
    res.status(200).json(hireRequests);
  } catch (error) {
    console.error("Error retrieving hire requests:", error);
    res.status(500).json({ message: "Failed to retrieve hire requests" });
  }
};

module.exports = {
  hireWorker,
  getAllHireRequests,
};
