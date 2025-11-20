// server.js

// 1️⃣ Import modules
const express = require("express");
const path = require("path");
require("dotenv").config();
const { connectDB, getVideosCollection, getBucket } = require("./config/db");

// 2️⃣ Initialize app
const app = express();

// 3️⃣ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend"))); // frontend folder serve

// 4️⃣ Routes

// Default / route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Connect to MongoDB and setup API routes
connectDB().then(() => {
  const videosCollection = getVideosCollection();
  const bucket = getBucket();

  // Fetch all videos
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await videosCollection.find({}).toArray();
      res.json(videos);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  // Fetch list of PDFs
  app.get("/api/pdfs", async (req, res) => {
    try {
      const files = await bucket.s.db.collection("uploads.files").find({}).toArray();
      const filenames = files.map(file => file.filename);
      res.json(filenames);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch PDF list" });
    }
  });

  // Download specific PDF
  app.get("/api/pdf/:filename", (req, res) => {
    const filename = req.params.filename;
    const downloadStream = bucket.openDownloadStreamByName(filename);

    downloadStream.on("error", () => res.status(404).send("File not found"));
    downloadStream.pipe(res);
  });
});

// Test API route
app.get("/api/test", (req, res) => res.send("Backend is running successfully!"));

// 5️⃣ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

