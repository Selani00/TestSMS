import express from "express";
import * as VerifyToken from '../middlewares/TokenVerification'
import * as ClientController from "../controllers/AccountController";


let router = express.Router();

router.post('/register-customer',  ClientController.register)

router.post('/login',  ClientController.login)

// router.post('/sms-send',VerifyToken.verifyToken,ClientController.sendSMS)

router.get('/logout',VerifyToken.verifyToken,ClientController.logout)

router.delete('/delete', VerifyToken.verifyToken, ClientController.deleteClient)

export default router;