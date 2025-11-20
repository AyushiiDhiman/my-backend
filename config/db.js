/// db.js
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

let videosCollection;
let bucket;

async function connectDB() {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected successfully!");

  // Get native MongoDB driver for GridFS
  const db = mongoose.connection.db;
  videosCollection = db.collection("videos"); // your videos collection
  bucket = new GridFSBucket(db, { bucketName: "uploads" });

  return { videosCollection, bucket };
}

function getVideosCollection() {
  return videosCollection;
}

function getBucket() {
  return bucket;
}

module.exports = { connectDB, getVideosCollection, getBucket };
