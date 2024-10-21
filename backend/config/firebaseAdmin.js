const admin = require("firebase-admin");

// Load the service account key JSON file
const serviceAccount = require("./serviceAccountKey.json");

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "city-care-hub-31732.appspot.com", // Change this to your actual storage bucket name
});

// Initialize Firestore and Storage
const db = admin.firestore();
const storage = admin.storage();

module.exports = { admin, db, storage }; // Export the admin instance along with db and storage
