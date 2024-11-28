import express from "express";
import { handleProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", handleProducts)


export default router;
