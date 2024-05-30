import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
// In our project, we can not allow frontend user to register a new account.
//ONLY admin is allowed to create a new admin user/customer user (role based)
//router.post("/register", register);

export default router;
