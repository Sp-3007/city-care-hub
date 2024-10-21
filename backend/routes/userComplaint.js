const express = require("express");

const router = express.Router();
const {
  getdata,
  registerComplaint,
  getComplaintDetails,
  deleteComplaint,
  updateComplaint, // Import the updateComplaint function
} = require("../controllers/userComplaint");

router.get("/", getdata);
router.get("/:complaintId", getComplaintDetails);
router.post("/", registerComplaint);
router.delete("/:complaintId", deleteComplaint);
router.put("/:complaintId", updateComplaint); // Add PUT route for updating a complaint

module.exports = router;
