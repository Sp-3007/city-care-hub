const express = require("express");
const userComplaint = require("./routes/userComplaint")
const authenticateUser = require("./middleware/authenticateUser");
const verifyAdminToken = require("./middleware/admin/adminauthentication")
const userroute = require("./routes/user/userroute")
const adminRoutes = require("./routes/admin/adminRoutes")
const path = require("path")
const app = express();
const cors = require("cors");
const newsshow = require("./routes/news")

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(
  "/api/complaint",
  authenticateUser,
  userComplaint
);

app.use("/api/admin", adminRoutes);
app.use("/api/citynews",newsshow);
app.use("/api/user",authenticateUser,userroute);

app.listen(5000, () => {
  console.log("App is running on : localhost:5000");
});
