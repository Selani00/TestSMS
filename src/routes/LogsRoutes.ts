import express from "express";
import * as VerifyToken from '../middlewares/TokenVerification'
import * as ClientController from "../controllers/AccountController";



let router = express.Router();



router.get('/get-logs', VerifyToken.verifyToken,ClientController.getWallet)



export default router;