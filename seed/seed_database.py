import os
from pymongo import MongoClient
from gridfs import GridFS

# MongoDB connection
MONGODB_URI = "mongodb://localhost:27017"
DB_NAME = "cloudtrail"
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
fs = GridFS(db, collection="uploads")
videos = db["videos"]

DATA_DIR = "pdfs"   # folder containing PDFs

# Upload PDFs
def seed_files():
    files = [f for f in os.listdir(DATA_DIR) if os.path.isfile(os.path.join(DATA_DIR, f))]
    for fname in files:
        if fname.startswith("."):
            continue
        if db["uploads.files"].find_one({"filename": fname}):
            print(f"Skipping (exists): {fname}")
            continue
        with open(os.path.join(DATA_DIR, fname), "rb") as fh:
            fid = fs.put(fh.read(), filename=fname, metadata={"source": "auto-seed"})
            print(f"Uploaded: {fname} → {fid}")

# Curated videos
CURATED_VIDEOS = [
    {"title": "AWS Certified Cloud Practitioner Full Course", "url": "https://www.youtube.com/watch?v=3hLmDS179YE", "source":"freeCodeCamp", "topic":"aws", "tags":["beginner","certification"]},
    # ... add more as needed
]

# Insert videos
def seed_videos():
    for v in CURATED_VIDEOS:
        if videos.find_one({"url": v["url"]}):
            print(f"Skipping (exists): {v['title']}")
            continue
        videos.insert_one({
            "title": v["title"],
            "url": v["url"],
            "source": v["source"],
            "topic": v["topic"].lower(),
            "tags": [t.lower() for t in v["tags"]]
        })
        print(f"Inserted video: {v['title']}")

# Run seeding
if __name__ == "__main__":
    print("Starting database seeding...")
    seed_files()
    seed_videos()
    print("Seeding completed!")
