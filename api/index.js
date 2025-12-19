require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err.message));

// -----------------------------
// Define User schema & model
const userSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model("User", userSchema);

// -----------------------------
// Routes

// Test route
app.get("/", (req, res) => {
  res.send("Node API is running successfully");
});

// POST /user route to test database connection
app.post("/api/user", async (req, res) => {
  try {
    const user = await User.create({ name: req.body.name });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// ❌ REMOVE app.listen()
// ❌ Do NOT use server ports in Vercel
// -----------------------------

// Export the Express app for Vercel
module.exports = app;
