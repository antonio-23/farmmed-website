import express from 'express';
import { login, register, logout, forgot } from "../controllers/auth.js";
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/forgot", forgot)

export default router 