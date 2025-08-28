import express from "express";
import Passage from "../models/Passage.js";

const router = express.Router();

// Create a passage (POST)
router.post("/", async (req, res) => {
  try {
    const { title, paragraph } = req.body;

    if (!title || !paragraph) {
      return res.status(400).json({ error: "Title and paragraph are required" });
    }

    const passage = new Passage({ title, paragraph });
    await passage.save();

    res.status(201).json({ message: "Passage created successfully", passage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch all passages (GET)
router.get("/", async (req, res) => {
  try {
    const passages = await Passage.find().sort({ createdAt: -1 });
    res.json(passages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
