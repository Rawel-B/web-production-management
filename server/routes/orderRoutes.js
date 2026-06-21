import express from "express";
import { getAllOrders } from "../controllers/order.js";
import { releaseNewOrder } from "../controllers/order.js";

const router = express.Router();

router.get("/", getAllOrders);
router.post("/releaseorder", releaseNewOrder);

export default router;
