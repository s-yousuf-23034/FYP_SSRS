import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyTokenAndRole = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    // Fetch the user from the database to get their role
    const user = await User.findById(verified.id);
    if (!user) {
      return res.status(403).send("Invalid user");
    }

    // Check if the user has the required role (admin or customer)
    if (user.role !== "admin" && user.role !== "customer") {
      return res.status(403).send("Unauthorized role");
    }

    // Attach the user role to the request for further processing
    req.user.role = user.role;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
