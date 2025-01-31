"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionHandler = void 0;
const CustomResponse_1 = require("../utils/CustomResponse");
const process_1 = __importDefault(require("process"));
const AppError_1 = require("../utils/AppError");
const StatusCodes_1 = require("../utils/StatusCodes");
const exceptionHandler = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥');
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    //send details about error to Log service
    yield addErrorLog(error);
    if (process_1.default.env.NODE_ENV === 'production') {
        let err = Object.assign({}, error);
        err.message = error.message;
        if (err.name === 'JsonWebTokenError')
            err = handleJWTError();
        if (err.name === 'TokenExpiredError')
            err = handleJWTExpiredError();
        if (err.name === 'SequelizeValidationError')
            err = handleValidationError(error);
        sendErrorToPro(err, res);
    }
    else {
        sendErrorToDev(error, res);
    }
});
exports.exceptionHandler = exceptionHandler;
const addErrorLog = (error) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(error.message);
    // await LogService.addErrorLog(LogLevel.INFO, LogMicroService.BACK_AUTH_SERVICE, error.message)
});
const sendErrorToDev = (error, res) => {
    //send error to a developer with more details
    res.status(error.statusCode).send(new CustomResponse_1.CustomResponse(error.customStatusCode ? error.customStatusCode : StatusCodes_1.StatusCodes.UNHANDLED_ERROR, error.message, {
        error: error,
        stack: error.stack
    }));
};
const sendErrorToPro = (error, res) => {
    //operational, trusted error -> send msg ti client
    if (error.isOperational) {
        res.status(error.statusCode).send(new CustomResponse_1.CustomResponse(error.customStatusCode ? error.customStatusCode : error.statusCode, error.message, error.status));
        //programming or unknown error -> don't leak error details to client
    }
    else {
        console.log(`🔥 ERROR 💥 `, error);
        res.status(500).send(new CustomResponse_1.CustomResponse(StatusCodes_1.StatusCodes.UNHANDLED_ERROR, 'Something went wrong!'));
    }
};
const handleJWTError = () => {
    return new AppError_1.AppError('Invalid token. Please log in again!', 401, StatusCodes_1.StatusCodes.INVALID_TOKEN);
};
const handleJWTExpiredError = () => new AppError_1.AppError('Your token has expired! Please log in again.', 401, StatusCodes_1.StatusCodes.TOKEN_EXPIRED);
const handleValidationError = (err) => {
    return new AppError_1.AppError(err.message, 422, StatusCodes_1.StatusCodes.VALIDATION_ERROR);
};
