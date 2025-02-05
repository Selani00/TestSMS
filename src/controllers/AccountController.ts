import express from "express";
import {CustomResponse} from "../utils/CustomResponse";
import {StatusCodes} from "../utils/StatusCodes";
import {ClientServiceImpl} from "../services/impl/AccountServiceImpl";

const clientService = new ClientServiceImpl();


export const login = (
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {


    clientService.login(
        req.body, 
        // req.headers.authorization
    )
        .then(response => {

            // console.log(response)

            res.status(200).send(
                new CustomResponse(
                    StatusCodes.SUCCESS,
                    "Login successful",
                    response
                )
            )

        })
        .catch(error => {
            console.log(error)

            next(error)
        })
}




export const register = (
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {

    clientService.register(
        req.body, 
        // req.ip
    )
        .then(response => {

            // console.log(response)

            res.status(200).send(
                new CustomResponse(
                    StatusCodes.SUCCESS,
                    "Registration successful",
                    response,
                )
            )

        })
        .catch(error => {
            console.log(error)
            next(error)
        })

}


export const getWallet = (
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {
    const {id} = req.query as any

    clientService.getWallet(id)
        .then(response => {
            res.status(200).send(new CustomResponse(StatusCodes.SUCCESS,"Wallet fetched successfully",response))
        })
        .catch(error => {
            next(error)
        })
}

export const sendSMS = (
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {
    

    clientService.sendSMS(req.body)
        .then(response => {
            res.status(200).send(new CustomResponse(StatusCodes.SUCCESS, "SMS sent successfully", response))
        })
        .catch(error => {
            next(error)
        })
}

export const logout = (
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {
    const {id} = req.query as any

    clientService.logout(id)
        .then(response => {
            res.status(200).send(new CustomResponse(StatusCodes.SUCCESS,"Logout successful",response))
        })
        .catch(error => {
            next(error)
        })
}

export const deleteClient = (
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {
    const {id} = req.query as any

    clientService.deleteClient(id)
        .then(response => {
            res.status(200).send(new CustomResponse(StatusCodes.SUCCESS, "Client deleted successfully", response))
        })
        .catch(error => {
            next(error)
        })
}

