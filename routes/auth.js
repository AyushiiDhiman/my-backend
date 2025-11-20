const express = require("express");
const router = express.Router();

// Dummy login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Just a dummy check
  if (email && password) {
    res.json({ message: "Login successful", token: "dummy-token" });
  } else {
    res.status(400).json({ error: "Email and password required" });
  }
});

module.exports = router;
