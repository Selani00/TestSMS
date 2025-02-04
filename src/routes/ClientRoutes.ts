import express from "express";
import * as VerifyToken from '../middlewares/TokenVerification'
import * as ClientController from "../controllers/ClientController";


let router = express.Router();

router.post('/register',  ClientController.register)

router.post('/login',  ClientController.login)

router.get('/wallet', VerifyToken.verifyToken,ClientController.getWallet)

router.post('/sms-send',VerifyToken.verifyToken,ClientController.sendSMS)

router.get('/logout',VerifyToken.verifyToken,ClientController.logout)

router.delete('/delete', VerifyToken.verifyToken, ClientController.deleteClient)

export default router;