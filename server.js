// server.js

const express = require("express");
const path = require("path");
require("dotenv").config();
const { getVideos, addVideo } = require("./config/db"); // JSON-based db.js

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend"))); // serve frontend

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// API routes

// Get all videos
app.get("/api/videos", (req, res) => {
  try {
    const videos = getVideos();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// Add a new video
app.post("/api/videos", (req, res) => {
  try {
    addVideo(req.body);
    res.json({ message: "Video added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add video" });
  }
});

// Test API
app.get("/api/test", (req, res) => res.send("Backend is running successfully!"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


