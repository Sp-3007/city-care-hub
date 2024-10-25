const express = require("express");
const router = express.Router();

const {
  hireWorker,
  getAllHireRequests,
} = require("../controllers/accessall/hireworker");

router.post("/" , hireWorker);
router.get("/", getAllHireRequests);

module.exports = router;
