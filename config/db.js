const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "videos.json");

// Ensure file exists
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

// Read all videos
function getVideos() {
  const jsonData = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(jsonData);
}

// Add a new video
function addVideo(video) {
  const videos = getVideos();
  videos.push(video);
  fs.writeFileSync(dataFile, JSON.stringify(videos, null, 2));
}

module.exports = { getVideos, addVideo };

