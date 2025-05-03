import express from "express";
import { getAllProducts } from "../controllers/product.js";
import { deleteSelectedProduct } from "../controllers/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.delete('/deletebyid/:id', deleteSelectedProduct);

export default router;
