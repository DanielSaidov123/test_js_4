import express from "express";
import { CreateUser } from "../controllers/users.js"

const router = express.Router();

router.route('/register').post(CreateUser)
 




export default router;