import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flashcardSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    question: {
      type: String,
      required: [true, "Required! Please add a question."],
    },
    answer: {
      type: String,
      required: [true, "Required! Please add an answer."],
    },
    category: {
      type: String,
      required: [true, "Required! Please add a category."],
    },
    tags: {
      type: [String],
      validate: (v) => v == null || v.length > 0,
    },
  },
  { timestamps: true }
);

// Name it "Flashcard" as mongoDB turn it plural automatically when creating a collection
const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;
