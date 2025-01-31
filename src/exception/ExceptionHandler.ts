import express from "express";
import {CustomResponse} from "../utils/CustomResponse";
import process from "process";
import {AppError} from "../utils/AppError";
import {StatusCodes} from "../utils/StatusCodes";
import * as LogService from '../utils/LogService'
import {LogLevel, LogMicroService} from '../utils/LogService'

export const exceptionHandler = async (error:any,req:express.Request,res:express.Response,next:express.NextFunction) => {
    console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥');
    
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error'

    //send details about error to Log service
    await addErrorLog(error)

    if (process.env.NODE_ENV === 'production'){

        let err = { ...error };

        err.message = error.message;

        if (err.name === 'JsonWebTokenError') err = handleJWTError();
        if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
        if (err.name === 'SequelizeValidationError') err = handleValidationError(error);

        sendErrorToPro(err,res);
    }else {
        sendErrorToDev(error,res);
    }
}

const addErrorLog = async (error:any) => {

    console.log(error.message)

    // await LogService.addErrorLog(LogLevel.INFO, LogMicroService.BACK_AUTH_SERVICE, error.message)

}

const sendErrorToDev = (error:any,res:express.Response) => {
    //send error to a developer with more details
    res.status(error.statusCode).send(
        new CustomResponse(
            error.customStatusCode ? error.customStatusCode : StatusCodes.UNHANDLED_ERROR,
            error.message,
            {
                error:error,
                stack:error.stack
            }
        )
    );
}

const sendErrorToPro = (error:any,res:express.Response) => {
    //operational, trusted error -> send msg ti client
    if (error.isOperational){
        res.status(error.statusCode).send(
            new CustomResponse(
                error.customStatusCode ? error.customStatusCode:error.statusCode,
                error.message,
                error.status
            )
        );
        //programming or unknown error -> don't leak error details to client
    }else {
        console.log(`🔥 ERROR 💥 `,error)

        res.status(500).send(
            new CustomResponse(
                StatusCodes.UNHANDLED_ERROR,'Something went wrong!')
        );
    }
}

const handleJWTError = () =>{
    return new AppError('Invalid token. Please log in again!', 401,StatusCodes.INVALID_TOKEN);
}

const handleJWTExpiredError = () =>
     new AppError('Your token has expired! Please log in again.', 401,StatusCodes.TOKEN_EXPIRED);

const handleValidationError = (err:any) => {
    return new AppError(err.message,422,StatusCodes.VALIDATION_ERROR)

}