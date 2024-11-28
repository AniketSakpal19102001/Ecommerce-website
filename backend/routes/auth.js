import express from "express";
import { handleLogin, handleLogout, handleProfile, handleRegister } from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", (req, res)=> res.send("Todo api ...."))
router.post("/register", handleRegister)
router.post("/login", handleLogin)
router.post("/logout", handleLogout)
router.patch("/profile",verifyToken, handleProfile)

export default router