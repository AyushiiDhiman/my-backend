require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

// Videos route
app.get("/api/videos", (req, res) => {
  const videos = JSON.parse(fs.readFileSync(path.join(__dirname, "data/videos.json")));
  res.json(videos);
});

// PDFs route
app.get("/api/pdfs", (req, res) => {
  const pdfs = JSON.parse(fs.readFileSync(path.join(__dirname, "data/pdfs.json")));
  res.json(pdfs.map(f => f.filename));
});

// Auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Test route
app.get("/api/test", (req, res) => res.send("Backend is running successfully!"));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
