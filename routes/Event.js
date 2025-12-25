import express from "express";
import { CreateEvent } from "../controllers/Event.js";

const router = express.Router();

router.route('/events').post(CreateEvent)
 



export default router;