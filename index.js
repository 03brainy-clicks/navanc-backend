const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const leadsRoutes = require("./routes/leads");
const authMiddleware = require("./middleware");

// Initialize Express
const app = express();

// parsing data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Your routes and middleware will go here
app.use("/auth", authRoutes);
app.use("/leads", authMiddleware,leadsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
