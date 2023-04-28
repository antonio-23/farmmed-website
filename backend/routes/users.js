import express from 'express';
import { all_users, search_user, add_user, delete_user, edit_user } from "../controllers/users.js";

const router = express.Router()

router.post("/allusers", all_users);
router.post("/searchuser", search_user);
router.post("/adduser", add_user);
router.post("/deleteuser", delete_user);
router.post("/edituser", edit_user);

export default router;