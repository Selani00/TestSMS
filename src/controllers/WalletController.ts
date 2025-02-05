import express from "express";
import {CustomResponse} from "../utils/CustomResponse";
import {StatusCodes} from "../utils/StatusCodes";
import {WalletServiceImpl} from "../services/impl/WalletServiceImpl";

const WalletService = new WalletServiceImpl();





export const getBalance = (
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {
    const {id} = req.query as any

    WalletService.getBalance(id)
        .then(response => {
            res.status(200).send(new CustomResponse(StatusCodes.SUCCESS,"Wallet fetched successfully",response))
        })
        .catch(error => {
            next(error)
        })
}


