// backend/routes/userRoutes.js
const express = require("express");
const { createAdminUser } = require("../../controllers/admin/adminRegister");
const {loginAdmin} = require("../../controllers/admin/adminLogin");
const {
  addNews,
  getLatestNews,
  deleteNews,
} = require("../../controllers/admin/newsupdate/createnews");
const verifyAdminToken = require("../../middleware/admin/adminauthentication");
const { upload, uploadPhoto } = require("../../middleware/photo");

const {
  getUserByInput,
} = require("../../controllers/admin/billpayment/getuserdata");


const router = express.Router();

router.post("/createadmin", createAdminUser); // POST endpoint to create an admin user
router.post("/loginadmin", loginAdmin);
router.post(
  "/news",
  verifyAdminToken,
  upload.single("photo"),
  uploadPhoto,
  addNews
);

router.get("/userdetails/:inputValue", verifyAdminToken, getUserByInput);

router.get("/news", verifyAdminToken, getLatestNews);
router.delete("/news/:id",verifyAdminToken, deleteNews);

module.exports = router;
