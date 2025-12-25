import express from "express";
import { CreateUser } from "../controllers/users.js"
import { CreateTickets } from "../controllers/Tickets.js";

const router = express.Router();

router.route('/register').post(CreateUser)
router.route('/tickets/buy').post( CreateTickets)




export default router;