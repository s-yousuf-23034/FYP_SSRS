import express from "express";
import {
  createUser,
  modifyUser,
  removeUser,
  addOrganization,
  modifyOrganization,
  removeOrganization,
  getAllOrganizations,

} from "../controllers/admin.js";
import { verifyTokenAndRole } from "../middleware/auth.js";

const router = express.Router();

// Use the verifyTokenAndRole middleware to check if the user has admin role
router.post(
  "/createUser",
  verifyTokenAndRole,
  (req, res, next) => {
    // Check if the user has admin role before executing createUser function
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).send("Unauthorized role");
    }
  },
  createUser
);

router.patch(
  "/modifyUser",
  verifyTokenAndRole,
  (req, res, next) => {
    // Check if the user has admin role before executing modifyUser function
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).send("Unauthorized role");
    }
  },
  modifyUser
);

router.post(
  "/removeUser",
  verifyTokenAndRole,
  (req, res, next) => {
    // Check if the user has admin role before executing removeUser function
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).send("Unauthorized role");
    }
  },
  removeUser
);

// New routes for organization functions
router.post(
  "/addOrganization",
  verifyTokenAndRole,
  (req, res, next) => {
    // Check if the user has admin role before executing addOrganization function
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).send("Unauthorized role");
    }
  },
  addOrganization
);

router.patch(
  "/modifyOrganization",
  verifyTokenAndRole,
  (req, res, next) => {
    // Check if the user has admin role before executing modifyOrganization function
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).send("Unauthorized role");
    }
  },
  modifyOrganization
);

router.post(
  "/removeOrganization/",
  verifyTokenAndRole,
  (req, res, next) => {
    // Check if the user has admin role before executing removeOrganization function
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).send("Unauthorized role");
    }
  },
  removeOrganization
);



// Get all organizations without token and role verification
router.get("/getAllOrganizations", getAllOrganizations);


export default router;
