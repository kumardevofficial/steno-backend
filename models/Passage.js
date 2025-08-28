import mongoose from "mongoose";

const passageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Passage = mongoose.model("Passage", passageSchema);

export default Passage;
