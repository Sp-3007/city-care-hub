// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUserWaterBills,
  updateBillStatus,
} = require("../../controllers/user/payment/userBill");
  
const {
  getUserById,
  updateUserProfile,
} = require("../../controllers/user/userinfo/userinfo");

router.get("/:userId", getUserById);

router.post("/:userId", updateUserProfile);

router.get("/waterbill/:userId", getUserWaterBills);

router.patch("/waterbill/:billId",updateBillStatus);

module.exports = router;
