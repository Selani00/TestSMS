"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.ClientServiceImpl = void 0;
const AppError_1 = require("../../utils/AppError");
const StatusCodes_1 = require("../../utils/StatusCodes");
const process_1 = __importDefault(require("process"));
const TokenGenerator = __importStar(require("../../utils/TokenGenerator"));
const RefreshTokenModel_1 = __importDefault(require("../../models/RefreshTokenModel"));
const DbConnection_1 = __importDefault(require("../../db/DbConnection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ClientModel_1 = __importDefault(require("../../models/ClientModel"));
const PayloadDTO_1 = require("../../dtos/PayloadDTO");
const ClientDTO_1 = require("../../dtos/ClientDTO");
const AuthDetailsDTO_1 = require("../../dtos/AuthDetailsDTO");
const walletModel_1 = __importDefault(require("../../models/walletModel"));
class ClientServiceImpl {
    constructor() {
        this.login = (details) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = details;
            if (!username || !password) {
                throw new AppError_1.AppError('Some data are missing! Please check and try again', 400, StatusCodes_1.StatusCodes.DATA_NOT_FOUND);
            }
            let client = yield ClientModel_1.default.findOne({
                where: {
                    username: username
                }
            });
            if (!client) {
                throw new AppError_1.AppError('User not found', 404, StatusCodes_1.StatusCodes.INVALID_USERNAME_OR_PASSWORD);
            }
            let isMatch = yield bcryptjs_1.default.compare(password, client.dataValues.password);
            if (!isMatch) {
                throw new AppError_1.AppError('Invalid username or password!', 401, StatusCodes_1.StatusCodes.INVALID_USERNAME_OR_PASSWORD);
            }
            let clientDTO = new ClientDTO_1.ClientDTO(client.dataValues.id, client.dataValues.username, client.dataValues.password, client.dataValues.role, client.dataValues.phone_number);
            let authDetailsDTO = yield this.generateTokens(clientDTO);
            return authDetailsDTO;
        });
        this.generateTokens = (dto) => __awaiter(this, void 0, void 0, function* () {
            let payloadDTO = new PayloadDTO_1.PayloadDTO(dto.toJSON());
            let accessToken = yield TokenGenerator.generateAccessToken(payloadDTO);
            let refreshTokenToken = yield TokenGenerator.generateRefreshToken(payloadDTO);
            return new AuthDetailsDTO_1.AuthDetailsDTO(payloadDTO.toJSON(), accessToken, refreshTokenToken);
        });
        this.register = (details) => __awaiter(this, void 0, void 0, function* () {
            const { username, password, phone_number } = details;
            if (!username || !password || !phone_number) {
                throw new AppError_1.AppError('Some data are missing! Please check and try again', 400, StatusCodes_1.StatusCodes.DATA_NOT_FOUND);
            }
            return yield DbConnection_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                // check whether the user is already registered
                const client = yield ClientModel_1.default.findOne({
                    where: {
                        username: username
                    }
                });
                if (client) {
                    throw new AppError_1.AppError('User already registered', 400, StatusCodes_1.StatusCodes.DUPLICATE_ENTRY);
                }
                // hash the password
                const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
                // save the user
                const user = yield ClientModel_1.default.create({
                    username: username,
                    password: hashedPassword,
                    phone_number: phone_number,
                    role: 'Client'
                }, {
                    transaction: transaction
                });
                console.log("This is user", user);
                let authDetailsDTO = yield this.generateTokens(new ClientDTO_1.ClientDTO(user.dataValues.id, user.dataValues.username, user.dataValues.password, user.dataValues.role, user.dataValues.phone_number));
                console.log("This is auth details", authDetailsDTO);
                //save refresh token in db
                yield this.saveRefreshToken(authDetailsDTO, transaction);
                console.log("sucessfully registered");
                return authDetailsDTO;
            }));
        });
        this.saveRefreshToken = (dto, transaction) => __awaiter(this, void 0, void 0, function* () {
            const expDate = new Date();
            expDate.setDate(expDate.getDate() + parseInt(process_1.default.env.REF_EXP_TIME_IN_DAYS || '7'));
            console.log("This is user id", dto.payload.user.id);
            yield RefreshTokenModel_1.default.create({
                token: dto.refreshToken,
                exp_time: expDate,
                user_id: dto.payload.user.id
            }, {
                transaction: transaction
            });
        });
        this.getWallet = (id) => __awaiter(this, void 0, void 0, function* () {
            console.log("This is id", id);
            const client = yield ClientModel_1.default.findOne({
                where: {
                    id: id
                }
            });
            const wallet = yield walletModel_1.default.findOne({
                where: {
                    client_id: id
                }
            });
            // return both client and wallet
            return {
                client: client,
                wallet: wallet
            };
        });
        this.sendSMS = (details) => __awaiter(this, void 0, void 0, function* () {
            const { user_id, content, reciver } = details;
            if (!user_id || !content || !reciver) {
                throw new AppError_1.AppError('Some data are missing! Please check and try again', 400, StatusCodes_1.StatusCodes.DATA_NOT_FOUND);
            }
            // find user id in wallet
            const wallet = yield walletModel_1.default.findOne({
                where: {
                    client_id: user_id
                }
            });
            if (!wallet) {
                // if wallet is not found, create a new wallet
                yield walletModel_1.default.create({
                    count: 1,
                    client_id: user_id
                });
            }
            else {
                wallet.increment('count', { by: 1 });
            }
            return "SMS sent successfully";
        });
    }
}
exports.ClientServiceImpl = ClientServiceImpl;
