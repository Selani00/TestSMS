import express from "express";
import {CustomResponse} from "../utils/CustomResponse";
import {StatusCodes} from "../utils/StatusCodes";
import {LogsServiceImpl} from "../services/impl/LogsServiceImpl";

const LogsService = new LogsServiceImpl();




export const getLogs = (
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {


    LogsService.getLogs()
        .then(response => {
            res.status(200).send(new CustomResponse(StatusCodes.SUCCESS,"Wallet fetched successfully",response))
        })
        .catch(error => {
            next(error)
        })
}



