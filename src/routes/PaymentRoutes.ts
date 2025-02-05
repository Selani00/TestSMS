import express from "express";
import * as VerifyToken from '../middlewares/TokenVerification'
import * as PaymentController from "../controllers/PaymentController";



let router = express.Router();



// router.get('/', VerifyToken.verifyToken,PaymentController.getpayment)



export default router;