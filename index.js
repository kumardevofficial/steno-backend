import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors"
import mongoose from "mongoose";

dotenv.config();   // load .env file
connectDB();

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const Post = mongoose.model("Post", PostSchema);

app.get("/", (req, res) => {
  res.send("hey welcome to the backend 🚀");
});

app.post("/api/posts", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newPost = new Post({ title, description });
    await newPost.save();
    res.status(201).json({ message: "Post created!", post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
