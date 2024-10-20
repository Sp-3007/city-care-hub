const express = require("express");

const router = express.Router();
const {
  getdata,
  registerComplaint,
  getComplaintDetails,
  deleteComplaint,
} = require("../controllers/userComplaint");

router.get("/", getdata);
router.get("/:complaintId",getComplaintDetails);
router.post("/", registerComplaint);
router.delete("/:complaintId", deleteComplaint); 

module.exports = router;
