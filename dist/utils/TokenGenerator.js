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
exports.generateToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
// import jwt, {Secret} from "jsonwebtoken";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = __importDefault(require("process"));
//generate new access token
const generateAccessToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process_1.default.env.ACCESS_TOKEN_SECRET || !process_1.default.env.ACC_EXP_TIME) {
        throw new Error('Required environment variables are not set');
    }
    let accessToken = yield (0, exports.generateToken)(payload, process_1.default.env.ACCESS_TOKEN_SECRET, process_1.default.env.ACC_EXP_TIME);
    //save token in redis
    // await redisClient.set(accessToken,JSON.stringify(payload.toJSON()),{EX: 604800})
    // await redisClient.set(accessToken, JSON.stringify(payload.toJSON()), 'EX', 604800);
    return accessToken;
});
exports.generateAccessToken = generateAccessToken;
//generate new refresh token
const generateRefreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process_1.default.env.REFRESH_TOKEN_SECRET || !process_1.default.env.REF_EXP_TIME) {
        throw new Error('Required environment variables are not set');
    }
    return (0, exports.generateToken)(payload, process_1.default.env.REFRESH_TOKEN_SECRET, process_1.default.env.REF_EXP_TIME);
});
exports.generateRefreshToken = generateRefreshToken;
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
const generateToken = (payload, secret, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    const options = expiresIn ? { expiresIn: expiresIn } : {};
    return jsonwebtoken_1.default.sign({ payload }, secret, options); // Remove "as Secret" if secret is properly typed
});
exports.generateToken = generateToken;
