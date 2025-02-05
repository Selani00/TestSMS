import express from "express";
import * as VerifyToken from '../middlewares/TokenVerification'
import * as LogsController from "../controllers/LogsController";

let router = express.Router();

router.get('/get-logs', VerifyToken.verifyToken,LogsController.getLogs)



export default router;