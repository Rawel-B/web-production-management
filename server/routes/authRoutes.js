import express from "express";
import { login, logout, authenticate } from "../controllers/auth.js";
import { authenticate as authMiddleware } from "../middleware/auth.js";
import { generateTokens } from "../middleware/auth.js";

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
// Protected route (requires valid token)
router.get('/auth', authMiddleware, authenticate);
router.post('/generatetoken', generateTokens, authenticate);

export default router;