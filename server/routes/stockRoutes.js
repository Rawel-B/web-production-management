import express from "express";
import { getAllStocks } from "../controllers/stock.js";
import { getStocksByNumber } from "../controllers/stock.js";
import { deleteSelectedStock } from "../controllers/stock.js";

const router = express.Router();

router.get("/", getAllStocks);
router.get("/getbynumber/:number", getStocksByNumber);
router.delete('/deletebyid/:id', deleteSelectedStock);

export default router;
