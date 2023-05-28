import express from 'express';
import { issuing_the_order, order_confirmation, order_rejection, show_drugs_in_order_chemist, show_order_chemist, show_order_user } from "../controllers/order.js";

const router = express.Router()

router.post("/show_user", show_order_user);
router.post("/show_chemist", show_order_chemist);
router.post("/show_drug_chemist", show_drugs_in_order_chemist);
router.post("/confirm", order_confirmation);
router.post("/reject", order_rejection);
router.post("/issuing", issuing_the_order);

export default router 