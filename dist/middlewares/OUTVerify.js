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
exports.verifyOUToken = void 0;
const AppError_1 = require("../utils/AppError");
const StatusCodes_1 = require("../utils/StatusCodes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import redisClient from "../redis/RadisConnection";
const verifyOUToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            throw new AppError_1.AppError('No token provided', 401, StatusCodes_1.StatusCodes.DATA_NOT_FOUND);
        }
        // Get token from header
        const token = req.headers.authorization.split(' ')[1];
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new AppError_1.AppError('Server configuration error', 500, StatusCodes_1.StatusCodes.UNHANDLED_ERROR);
        }
        // Verify token
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // Add user info to request object
            if (typeof decoded === 'object' && decoded.payload && decoded.payload.user) {
                req.user = decoded.payload.user;
            }
            else {
                throw new AppError_1.AppError('Invalid token payload', 401, StatusCodes_1.StatusCodes.DATA_NOT_FOUND);
            }
            next();
        }
        catch (err) {
            throw new AppError_1.AppError('Invalid or expired token', 401, StatusCodes_1.StatusCodes.UNAUTHORIZED_ACCESS);
        }
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.verifyOUToken = verifyOUToken;
