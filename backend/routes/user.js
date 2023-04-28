import express from 'express';
import { getUser, getName } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.post("/name", getName)

export default router 