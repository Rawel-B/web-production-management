import express from "express";
import { getAllSalesStats } from "../controllers/sales.js";
import { getSalesStats } from "../controllers/sales.js";

const router = express.Router();

router.get("/", getAllSalesStats);
router.get("/stats", getSalesStats);

export default router;
