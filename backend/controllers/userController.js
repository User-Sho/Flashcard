import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/userModel.js";

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields." });
  }

  // Check if the user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ error: "User already exists." });
  }

  // If those checks above pass, then encrypt the user info and register
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user with the hashed pw
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    // For better security, email and password are excluded from the res.status below
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
      exp: getExpiresAt(generateToken(user._id)).exp,
    });
  } else {
    return res.status(400).json({ error: "Invalid user data" });
  }
};

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user email exists
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // For better security, email and password are excluded from the res.status below
    return res.json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
      exp: getExpiresAt(generateToken(user._id)).exp,
    });
  } else {
    return res.status(400).json({ error: "Invalid credentials." });
  }
};

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// Function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Function to get the token expiration
const getExpiresAt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { registerUser, loginUser, getMe };
