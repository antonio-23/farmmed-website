import express from 'express';
import { login, register, logout, forgot, auth} from "../controllers/auth.js";
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
// dodaj middleware validateCookies do wszystkich tras po wywołaniu funkcji login
router.get("/auth", auth, );
router.post("/logout", logout);
router.post("/forgot", forgot);

router.get("/authorize", authorize)

export default router;
