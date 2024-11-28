import express from "express";
import {
  handleGetCart,
  handleAddCart,
  handleEditCart,
  handleDeleteItem,
} from "../controllers/cartController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/getCart", verifyToken, handleGetCart);
router.post("/addCart", verifyToken, handleAddCart);
router.patch("/editCart", verifyToken, handleEditCart);
router.delete("/delete", verifyToken, handleDeleteItem);
export default router;
