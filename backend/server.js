const express = require("express");
const userComplaint = require("./routes/userComplaint")
const authenticateUser = require("./middleware/authenticateUser");
const path = require("path")
const app = express();
const cors = require("cors");
const multer = require("multer"); 

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(
  "/api/complaint",
  authenticateUser,
  upload.single("photo"),
  userComplaint
);

app.listen(5000, () => {
  console.log("App is running on : localhost:5000");
});
