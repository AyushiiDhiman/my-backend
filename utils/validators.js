// routes/auth.js
const express = require("express");
const router = express.Router();

const { isValidUsername, isValidPassword } = require("../utils/validators");
const { STATUS } = require("../utils/constants");

// --- Hardcoded users (for demo purposes) ---
const users = [
  { username: "ayushi", password: "1234" }
];

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // --- Input validation ---
  if (!isValidUsername(username) || !isValidPassword(password)) {
    return res.status(400).json({ status: STATUS.FAILURE, message: "Invalid input" });
  }

  // --- Authenticate user ---
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.json({ status: STATUS.SUCCESS, message: `Welcome back, ${username}!` });
  } else {
    return res.status(401).json({ status: STATUS.FAILURE, message: "Invalid username or password!" });
  }
});

// POST /api/auth/signup (demo - add new user)
router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // --- Input validation ---
  if (!isValidUsername(username) || !isValidPassword(password)) {
    return res.status(400).json({ status: STATUS.FAILURE, message: "Invalid input" });
  }

  // --- Check if user already exists ---
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ status: STATUS.FAILURE, message: "User already exists!" });
  }

  // --- Add user (for demo, in-memory) ---
  users.push({ username, password });
  return res.status(201).json({ status: STATUS.SUCCESS, message: "User registered successfully!" });
});

module.exports = router;
