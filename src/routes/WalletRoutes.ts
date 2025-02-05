import express from "express";
import * as VerifyToken from '../middlewares/TokenVerification'
import * as WalletController from "../controllers/WalletController";


let router = express.Router();

router.get('/get-balance', VerifyToken.verifyToken,WalletController.getBalance)


export default router;