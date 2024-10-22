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
} = require("../controllers/accessall/userComplaint");



router.get("/", getdata);
router.get("/:complaintId", getComplaintDetails);
router.post("/",verifyAdminToken,upload.single("photo"), uploadPhoto, registerComplaint);
router.delete("/:complaintId", deleteComplaint);
router.put("/:complaintId", updateComplaint);
module.exports = router;
