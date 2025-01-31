import express from "express";
import * as OUTVerify from '../middlewares/OUTVerify'
import * as ClientController from "../controllers/ClientController";


let router = express.Router();

router.post('/register',  ClientController.register)

router.post('/login',  ClientController.login)

router.get('/wallet',OUTVerify.verifyOUToken,ClientController.getWallet)

router.post('/sms-send',OUTVerify.verifyOUToken,ClientController.sendSMS)


export default router;