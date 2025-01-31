"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = exports.getWallet = exports.register = exports.login = void 0;
const CustomResponse_1 = require("../utils/CustomResponse");
const StatusCodes_1 = require("../utils/StatusCodes");
const ClientServiceImpl_1 = require("../services/impl/ClientServiceImpl");
const clientService = new ClientServiceImpl_1.ClientServiceImpl();
const login = (req, res, next) => {
    clientService.login(req.body)
        .then(response => {
        // console.log(response)
        res.status(200).send(new CustomResponse_1.CustomResponse(StatusCodes_1.StatusCodes.SUCCESS, "Login successful", response));
    })
        .catch(error => {
        console.log(error);
        next(error);
    });
};
exports.login = login;
const register = (req, res, next) => {
    clientService.register(req.body)
        .then(response => {
        // console.log(response)
        res.status(200).send(new CustomResponse_1.CustomResponse(StatusCodes_1.StatusCodes.SUCCESS, "Registration successful", response));
    })
        .catch(error => {
        console.log(error);
        next(error);
    });
};
exports.register = register;
const getWallet = (req, res, next) => {
    const { id } = req.query;
    clientService.getWallet(id)
        .then(response => {
        res.status(200).send(new CustomResponse_1.CustomResponse(StatusCodes_1.StatusCodes.SUCCESS, "Wallet fetched successfully", response));
    })
        .catch(error => {
        next(error);
    });
};
exports.getWallet = getWallet;
const sendSMS = (req, res, next) => {
    clientService.sendSMS(req.body)
        .then(response => {
        res.status(200).send(new CustomResponse_1.CustomResponse(StatusCodes_1.StatusCodes.SUCCESS, "SMS sent successfully", response));
    })
        .catch(error => {
        next(error);
    });
};
exports.sendSMS = sendSMS;
