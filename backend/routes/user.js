import express from 'express';
import { getUser, getName, show_data, edit_data } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.post("/name", getName);
router.post("/show", show_data);
router.post("/edit", edit_data);

export default router 