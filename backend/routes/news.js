const express = require("express");
const router = express.Router();

const {
  getLatestNews,
  updateViewCount,
} = require("../controllers/user/news/getnews");


router.get("/", getLatestNews);
router.put("/:id/views", updateViewCount);

module.exports = router;
