// import jwt, {Secret} from "jsonwebtoken";
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import process from "process";
import {PayloadDTO} from "../dtos/PayloadDTO";
// import redisClient from "../redis/RadisConnection";
import { v4 as uuidv4 } from 'uuid';
import {ServicesEnum} from "./ServicesEnum";

//generate new access token
export const generateAccessToken = async (payload:PayloadDTO):Promise<string> => {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACC_EXP_TIME) {
        throw new Error('Required environment variables are not set');
    }
    let accessToken = await generateToken(payload, process.env.ACCESS_TOKEN_SECRET, process.env.ACC_EXP_TIME);

    //save token in redis
    // await redisClient.set(accessToken,JSON.stringify(payload.toJSON()),{EX: 604800})
    // await redisClient.set(accessToken, JSON.stringify(payload.toJSON()), 'EX', 604800);

    return accessToken;

}

//generate new refresh token
export const generateRefreshToken = async (payload:PayloadDTO):Promise<string> => {
    if (!process.env.REFRESH_TOKEN_SECRET || !process.env.REF_EXP_TIME) {
        throw new Error('Required environment variables are not set');
    }
    return generateToken(payload, process.env.REFRESH_TOKEN_SECRET, process.env.REF_EXP_TIME);
}

// generate one-time use token
// export const generateOUToken = async (targetService:ServicesEnum):Promise<string> => {

//     // token structure - OUT:token-user@546:1234565

//     // Generate key and value
//     const key = `${targetService}@${uuidv4()}`;
//     const value = uuidv4();

//     // generate token
//     const token = `OUT:${key}:${value}`;

//     // set token to redis with expiration time
//     if (!process.env.OUT_EXP_TIME) {
//         throw new Error('OUT_EXP_TIME environment variable is not set');
//     }
//     // await redisClient.set(key, value, 'EX', parseInt(process.env.OUT_EXP_TIME));

//     return token;
// }


// //generate jwt token
// const generateToken = async (
//     payload: PayloadDTO,
//     secret: string,
//     expiresIn?: string
// ): Promise<string> => {
//     return jwt.sign(
//         { payload }, 
//         secret, 
//         { expiresIn: expiresIn || '1h' }  // provide default value and correct options format
//     );
// }

// const generateToken = async (
//     payload:PayloadDTO,
//     secret: string,
//     expiresIn?: string
// ):Promise<string> => {
//     return jwt.sign({payload}, secret as Secret, {expiresIn: expiresIn});
// }

export const generateToken = async (
    payload: PayloadDTO,
    secret: Secret,
    expiresIn?: string
  ): Promise<string> => {
    const options: SignOptions = expiresIn ? { expiresIn: expiresIn as SignOptions['expiresIn'] } : {};
    return jwt.sign({ payload }, secret, options); // Remove "as Secret" if secret is properly typed
  };
