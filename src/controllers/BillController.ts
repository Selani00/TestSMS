import express from "express";
import {CustomResponse} from "../utils/CustomResponse";
import {StatusCodes} from "../utils/StatusCodes";
import {BillServiceImpl} from "../services/impl/BillServiceImpl";

const BillService = new BillServiceImpl();


export const getTotalBill = (
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {
    const {id} = req.query as any

    BillService.getTotalBill(id)
        .then(response => {
            res.status(200).send(new CustomResponse(StatusCodes.SUCCESS,"Wallet fetched successfully",response))
        })
        .catch(error => {
            next(error)
        })
}


