import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import process from "process";
import {PayloadDTO} from "../dtos/PayloadDTO";


//generate new access token
export const generateAccessToken = async (payload:PayloadDTO):Promise<string> => {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACC_EXP_TIME) {
        throw new Error('Required environment variables are not set');
    }
    let accessToken = await generateToken(payload, process.env.ACCESS_TOKEN_SECRET, process.env.ACC_EXP_TIME);

    return accessToken;

}

//generate new refresh token
export const generateRefreshToken = async (payload:PayloadDTO):Promise<string> => {
    if (!process.env.REFRESH_TOKEN_SECRET || !process.env.REF_EXP_TIME) {
        throw new Error('Required environment variables are not set');
    }
    return generateToken(payload, process.env.REFRESH_TOKEN_SECRET, process.env.REF_EXP_TIME);
}


export const generateToken = async (
    payload: PayloadDTO,
    secret: Secret,
    expiresIn?: string
  ): Promise<string> => {
    const options: SignOptions = expiresIn ? { expiresIn: expiresIn as SignOptions['expiresIn'] } : {};
    return jwt.sign({ payload }, secret, options); // Remove "as Secret" if secret is properly typed
  };
