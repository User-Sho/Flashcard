import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import cors form "cors";
import "colors";

// import { errorHandler } from "./middleware/errorMiddleware.js";
import flashcardRoutes from "./routes/flashcardsRoutes.js";
import userRoutes from "./routes/usersRoutes.js";

const limiter = rateLimit({
  windowMs: 1000,
  max: 10,
  message: "To many GET requests! Unexpected infinite loop?",
});

// create an express app
const app = express();

// General app setups
app.use(bodyParser.urlencoded({ extended: true }));

// middleware
app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method.yellow} => ${req.path.yellow} route`);
  next();
});


////////////////////
// All routes
app.use("/api/", limiter);
app.use("/api/flashcards", flashcardRoutes); //attaches all the flashcard routes to the app
app.use("/api/users", userRoutes);

// app.use(errorHandler);

///////////////////
// connect to MongoDB
const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then((data) => {
    console.log(
      `MongoDB Connected: ${data.connection.host}🔥🔥🔥`.blue.underline
    );
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
