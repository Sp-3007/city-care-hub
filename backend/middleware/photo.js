// middlewares/uploadPhoto.js
const { db } = require("../config/firebaseAdmin");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const { getStorage } = require("firebase-admin/storage");
const multer = require("multer");

// Initialize Firebase Storage bucket
const bucket = getStorage().bucket();

// Setup multer for handling form-data (files)
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to handle file upload to Firebase Storage
const uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      // If no file is uploaded, proceed without a photo URL
      return next();
    }

    const photo = req.file;
    const photoFileName = `public/${uuidv4()}-${photo.originalname}`; // Generate a unique file name
    const file = bucket.file(photoFileName); // Reference to the file in Firebase Storage

    // Upload the photo to Firebase Storage
    await file.save(photo.buffer, {
      metadata: {
        contentType: photo.mimetype,
      },
    });

    // Make the file publicly accessible
    await file.makePublic();

    // Generate the public URL for the uploaded photo
    const photoUrl = `https://storage.googleapis.com/${bucket.name}/${photoFileName}`;

    // Attach the photo URL to the request so that the controller can use it
    req.photoUrl = photoUrl;

    next(); // Proceed to the controller or next middleware
  } catch (error) {
    console.error("Error uploading photo:", error);
    return res.status(500).json({ message: "Error uploading photo.", error });
  }
};

module.exports = { upload, uploadPhoto };
