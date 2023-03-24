import express from "express";
const router = express.Router();
// import rateLimit from "express-rate-limit";

import {
  getFlashcards,
  createFlashcard,
  deleteFlashcard,
  updateFlashcard,
} from "../controllers/flashcardController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

// GET req to "/" as well as query to it
router.get("/", protectRoute, getFlashcards);

router.post("/", protectRoute, createFlashcard);

router.patch("/:id", protectRoute, updateFlashcard);

router.delete("/:id", protectRoute, deleteFlashcard);

export default router;
