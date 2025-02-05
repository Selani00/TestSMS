import express from "express";
import * as VerifyToken from '../middlewares/TokenVerification'
import * as BillController from "../controllers/BillController";



let router = express.Router();



router.get('/get-total-bill', VerifyToken.verifyToken,BillController.getTotalBill)



export default router;