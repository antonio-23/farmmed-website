import express from 'express';
import { user, search_users, add_user, delete_user, edit_user, search_users_prescription, view_doctor } from "../controllers/users.js";

const router = express.Router()

router.post("/user", user);
router.post("/searchuser", search_users);
router.post("/adduser", add_user);
router.post("/deleteuser", delete_user);
router.post("/edituser", edit_user);
router.post("/search", search_users_prescription);
router.post("/view", view_doctor); 
export default router;