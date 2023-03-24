import mongoose from "mongoose";

import Flashcard from "../models/flashcardModel.js";

// @desc GET all and filtered flashcards
// @route GET /api/flashcards
// @access Private
const getFlashcards = async (req, res) => {
  const hasQuery =
    Object.keys(req.query).length > 0 && typeof req.query === "object"
      ? true
      : false;
  const { category, tags } = req.query;

  // Fetch all cards if any when dispatch(getAllCards) is run.
  if (hasQuery === false || category === "" || category === "All") {
    const flashcards = await Flashcard.find({ user: req.user.id }).sort({
      created: -1,
    });

    return res.status(200).json(flashcards);
  }

  // Fetch all matching cards when ONLY the MAIN category is specified.
  if (category !== "All" && (!tags || tags === "All")) {
    const partiallyQueriedCards = await Flashcard.find({
      user: req.user.id,
      category: category,
    }).sort({ created: -1 });

    return res.status(200).json(partiallyQueriedCards);
  }

  // Fetch all matching cards when the main & sub (tags) categories are specified.
  if (category !== "All" && tags !== "" && tags !== "All") {
    const fullyQueriedCards = await Flashcard.find({
      user: req.user.id,
      category: category,
      tags: tags,
    }).sort({ created: -1 });

    return res.status(200).json(fullyQueriedCards);
  }

  // Queries received but both categories are not specified e.g "" or All.
  // and if any other unexpected queries are passed, fetch all
  const flashcards = await Flashcard.find({ user: req.user.id }).sort({
    created: -1,
  });

  return res.status(200).json(flashcards);
};

// @desc GET a single flashcard
// @route GET /api/flashcards/:id
// @access Private
const getFlashcard = async (req, res) => {
  const cardID = req.params.id;
  const userID = req.user.id;

  // Check if the flashcard exists
  if (!mongoose.Types.ObjectId.isValid(cardID)) {
    return res.status(400).json({ error: "No such card(id) found." });
  }

  // Check the User database if the user id retrieved from the token exists
  if (!req.user) {
    return res.status(401).json({ error: "User not found." });
  }

  // Once the card ID and the user data are verified above,
  // then, look for the card in the database
  const flashcard = await Flashcard.findById(cardID);

  if (!flashcard) {
    return res.status(400).json({ error: "No such card found!!!" });
  }

  // Make sure the logged-in user mathes the flashcard user
  if (flashcard.user.toString() !== userID) {
    return res.status(401).json({ error: "User not authorized." });
  }

  res.status(200).json(flashcard);
};

// @desc Create a new flashcard
// @route POST /api/flashcards
// @access Private
const createFlashcard = async (req, res) => {
  const { question, answer, category, tags } = req.body;
  const { id } = req.user;

  if (!question || !answer || !category || !tags) {
    return res.status(400).json({ error: "All fields must be provided." });
  }

  try {
    const newFlashcard = await Flashcard.create({
      question,
      answer,
      category,
      tags,
      user: id,
    });

    res.status(200).json(newFlashcard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Update a single flashcard
// @route PATCH /api/flashcards/:id
// @access Private
const updateFlashcard = async (req, res) => {
  const cardID = req.params.id;
  const userID = req.user.id;

  // Check if the flashcard exists
  if (!mongoose.Types.ObjectId.isValid(cardID)) {
    return res.status(400).json({ error: "No such card(id) found." });
  }

  const flashcard = await Flashcard.findById(cardID);
  if (!flashcard) {
    return res.status(400).json({ error: "No such card found." });
  }

  // Check the User database if the user id in the token exists
  if (!req.user) {
    return res.status(401).json({ error: "User not found." });
  }

  // Make sure the logged-in user mathes the flashcard user
  if (flashcard.user.toString() !== userID) {
    return res.status(401).json({ error: "User not authorized." });
  }

  // Find a card and update
  const updatedFlashcard = await Flashcard.findOneAndUpdate(
    { _id: cardID },
    {
      ...req.body,
    },
    { new: true }
  );
  res.status(200).json(updatedFlashcard);
};

// @desc Delete a single flashcard
// @route DELETE /api/flashcards/:id
// @access Private
const deleteFlashcard = async (req, res) => {
  const cardID = req.params.id;
  const userID = req.user.id;

  // Check if the flashcard exists
  if (!mongoose.Types.ObjectId.isValid(cardID)) {
    return res.status(400).json({ error: "No such card(id) found." });
  }

  const flashcard = await Flashcard.findById(cardID);
  if (!flashcard) {
    return res.status(400).json({ error: "No such card found." });
  }

  // Check the User database if the user id in the token exists
  if (!req.user) {
    return res.status(401).json({ error: "User not found." });
  }

  // Make sure the logged-in user mathes the flashcard user
  if (flashcard.user.toString() !== userID) {
    return res.status(401).json({ error: "User not authorized." });
  }

  const deletedFlashcard = await Flashcard.findOneAndDelete({ _id: cardID });
  res.status(200).json(deletedFlashcard);
};

export {
  getFlashcards,
  getFlashcard,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
};
