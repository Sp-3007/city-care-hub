// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
  
const {
  getUserById,
  updateUserProfile,
} = require("../../controllers/user/userinfo/userinfo");

router.get("/:userId", getUserById);

router.post("/:userId", updateUserProfile);

module.exports = router;
