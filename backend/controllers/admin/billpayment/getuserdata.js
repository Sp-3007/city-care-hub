const { admin, db } = require("../../../config/firebaseAdmin");

// Controller function to fetch user by ID or mobile number
const getUserByInput = async (req, res) => {
  const { inputValue } = req.params; // Get inputValue from route params

  try {
    const userRef = db.collection("users");
    const userSnapshot = await userRef.get(); // Fetch all users

    let userData = null;

    // Iterate through the users to find a match
    userSnapshot.forEach((doc) => {
      const user = doc.data();
      
      if (user.userId === inputValue || user.mobileNumber === inputValue) {
        userData = { id: doc.id, ...user };
      }
    });

    // If user is found, return user data
    if (userData) {
      return res.status(200).json(userData);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserByInput };
