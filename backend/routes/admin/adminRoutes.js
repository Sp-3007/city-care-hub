// backend/routes/userRoutes.js
const express = require("express");
const { createAdminUser } = require("../../controllers/admin/adminRegister");
const {loginAdmin} = require("../../controllers/admin/adminLogin")

const router = express.Router();

router.post("/createadmin", createAdminUser); // POST endpoint to create an admin user
router.post("/loginadmin", loginAdmin);

module.exports = router;
