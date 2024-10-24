const express = require("express");
const verifyAdminToken = require("../middleware/admin/adminauthentication")
const { upload, uploadPhoto } = require("../middleware/photo");

const router = express.Router();
const {
  getdata,
  registerComplaint,
  getComplaintDetails,
  deleteComplaint,
  updateComplaint,
  getUserComplaints,
} = require("../controllers/accessall/userComplaint");


router.get("/", getdata);
router.get("/user", getUserComplaints);
router.get("/:complaintId", getComplaintDetails);
router.post("/",upload.single("photo"), uploadPhoto, registerComplaint);
router.delete("/:complaintId", deleteComplaint);
router.put("/:complaintId", updateComplaint);
module.exports = router;
