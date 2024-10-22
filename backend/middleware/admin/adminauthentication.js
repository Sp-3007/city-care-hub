// middlewares/authAdmin.js
const admin = require("firebase-admin");

// Middleware to verify JWT token and custom admin claims
const verifyAdminToken = async (req, res, next) => {
  // Get the token from the Authorization header
  const authToken = req.headers.authorization?.split(" ")[1];

  // Check if the token exists
  if (!authToken) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    // Verify the token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(authToken);

    // Check if the user has the admin claim
    if (decodedToken.admin === true) {
      req.user = decodedToken; // Attach user data to the request
      next(); // Proceed to the next middleware
    } else {
      return res.status(403).json({ message: "Insufficient permissions." });
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(401)
      .json({ message: "Token is invalid or expired.", error });
  }
};

module.exports = verifyAdminToken;
