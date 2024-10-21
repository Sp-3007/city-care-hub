const admin = require("firebase-admin");

// Admin login function
const loginAdmin = async (req, res) => {
  const { token } = req.body; // Token from the frontend

  try {
    // Verify the token from the frontend
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Get the user details
    const user = await admin.auth().getUser(decodedToken.uid);

    // Check if user has custom claims with 'admin: true'
    if (decodedToken.admin === true) {
      return res
        .status(200)
        .json({ message: "Admin login successful", role: "admin" });
    } else {
      return res.status(403).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { loginAdmin };
