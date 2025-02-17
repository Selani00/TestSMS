// import express from "express";
// import {AppError} from "../utils/AppError";
// import {StatusCodes} from "../utils/StatusCodes";
// import jwt from 'jsonwebtoken';

// export const verifyToken = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

//     try {
//         if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
//             throw new AppError(
//                 'No token provided',
//                 401,
//                 StatusCodes.DATA_NOT_FOUND
//             );
//         }

//         // Get token from header
//         const token = req.headers.authorization.split(' ')[1];

//         if (!process.env.ACCESS_TOKEN_SECRET) {
//             throw new AppError(
//                 'Server configuration error',
//                 500,
//                 StatusCodes.UNHANDLED_ERROR
//             );
//         }

//         // Verify token
//         try {
//             const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            
//             // Add user info to request object
//             if (typeof decoded === 'object' && decoded.payload && decoded.payload.user) {
//                 req.user = decoded.payload.user;
//             } else {
//                 throw new AppError(
//                     'Invalid token payload',
//                     401,
//                     StatusCodes.DATA_NOT_FOUND
//                 );
//             }

//             next();
//         } catch (err) {
//             throw new AppError(
//                 'Invalid or expired token',
//                 401,
//                 StatusCodes.UNAUTHORIZED_ACCESS
//             );
//         }

//     }catch (error) {
//         console.log(error);
        
//         return next(error)
//     }

// }

// // Add type declaration for the Express Request interface
// declare global {
//     namespace Express {
//         interface Request {
//             user?: any;
//         }
//     }
// }


import express from "express";
import { AppError } from "../utils/AppError";
import { StatusCodes } from "../utils/StatusCodes";
import jwt from "jsonwebtoken";
import RefreshTokenModel from "../models/RefreshTokenModel";
import { Op } from "sequelize";

export const verifyToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            throw new AppError("No token provided", 401, StatusCodes.DATA_NOT_FOUND);
        }

        // Extract token from header
        const token = req.headers.authorization.split(" ")[1];


        if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new AppError("Server configuration error", 500, StatusCodes.UNHANDLED_ERROR);
        }

        // Check if token exists in the database
        const storedToken = await RefreshTokenModel.findOne({
            where: {
                token: token,
                exp_time: {
                    [Op.gt]: new Date(), // Check if token is not expired
                },
            },
        });


        if (!storedToken) {
            throw new AppError("Invalid or expired token", 401, StatusCodes.UNAUTHORIZED_ACCESS);
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

            // Add user info to request object
            if (typeof decoded === "object" && decoded.payload && decoded.payload.user) {
                req.user = decoded.payload.user;
            } else {
                throw new AppError("Invalid token payload", 401, StatusCodes.DATA_NOT_FOUND);
            }

             console.log("This is user id",req.user.id)
             console.log("Token verified successfully")
            next();

        } catch (err) {
            throw new AppError("Invalid or expired token", 401, StatusCodes.UNAUTHORIZED_ACCESS);
        }
    } catch (error) {

        return next(error);
    }
};

// Add type declaration for the Express Request interface
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
