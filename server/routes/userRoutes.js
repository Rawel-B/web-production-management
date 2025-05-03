import express from "express";
import { getAllAdmins } from "../controllers/user.js";
import { getAllWorkers } from "../controllers/user.js";
import { getAllManagers } from "../controllers/user.js";
import { getUserById } from "../controllers/user.js";
import { deleteSelectedUser } from "../controllers/user.js";
import { updateCurrentUser } from "../controllers/user.js";
import { getAllTickets } from "../controllers/user.js";
import { openNewTicket } from "../controllers/user.js";
import { updateCurrentTicket } from "../controllers/user.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/admins", getAllAdmins);
router.get("/workers", getAllWorkers);
router.get("/managers", getAllManagers);
router.get("/currentuser/:_id", authenticate, getUserById);
router.delete("/deletebyid/:id", deleteSelectedUser);
router.put("/updatebyemail/:email", updateCurrentUser);
router.get("/tickets", getAllTickets);
router.post("/openticket", openNewTicket);
router.put("/updateticket/:_id", updateCurrentTicket);

export default router;
