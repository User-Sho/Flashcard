import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!!!!!" });
  }
  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid authorization token." });
  }

  //Get token from header
  const token = authorization.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    // Note that we use mongoose select() method to exclude the password and email here
    req.user = await User.findById(decoded.id).select("-password -email");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Not authorized user. Sorry🥺" });
  }

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }
};

export { protectRoute };
