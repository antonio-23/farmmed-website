import express from 'express';
import { getUser, getName, show_data, show_data2, edit_data, edit_password } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.post("/name", getName);
router.post("/show", show_data);
router.post("/show2", show_data2);
router.post("/edit", edit_data);
router.post("/editpassword", edit_password)

export default router 