const admin = require("firebase-admin");

// Create Admin User and Assign Role
exports.createAdminUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user with email and password
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    console.log("User created successfully:", userRecord.uid);

    // Set custom user claims to make this user an admin
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log("Admin claim assigned to user:", userRecord.uid);

    return res.status(201).json({
      message: `Admin user created successfully: ${email}`,
      uid: userRecord.uid,
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    return res.status(500).json({ error: error.message });
  }
};
