import {AppError} from "../../utils/AppError";
import {StatusCodes} from "../../utils/StatusCodes";
import {Transaction} from "sequelize";
import process from "process";
import * as TokenGenerator from "../../utils/TokenGenerator";
import RefreshTokenModel from "../../models/RefreshTokenModel";
import {ClientService} from "../ClientService";
import sequelize from "../../db/DbConnection";
import bcrypt from "bcryptjs";
import ClientModel from "../../models/ClientModel";
import {PayloadDTO} from "../../dtos/PayloadDTO";
import { ClientDTO } from "../../dtos/ClientDTO";
import {AuthDetailsDTO} from "../../dtos/AuthDetailsDTO";
import WalletModel from "../../models/walletModel";

// import {UserBehaviourServiceImpl} from "./UserBehaviourServiceImpl";
// import {QAForm1ServiceImpl} from "./QAForm1ServiceImpl";
import * as LogService from '../../utils/LogService'

export class ClientServiceImpl implements ClientService{


    constructor() {
    }


    public login = async (details:any) => {

        const { username, password} = details;

        if (!username || !password){
            throw new AppError(
                'Some data are missing! Please check and try again',
                400,
                StatusCodes.DATA_NOT_FOUND
            )
        }
        
        let client = await ClientModel.findOne({
            where: {
                username: username
            }
        });

        if (!client){
            throw new AppError(
                'User not found',
                404,
                StatusCodes.INVALID_USERNAME_OR_PASSWORD
            )
        }

        let isMatch =  await bcrypt.compare(password, client.dataValues.password);

        if (!isMatch){
            throw new AppError(
                'Invalid username or password!',
                401,
                StatusCodes.INVALID_USERNAME_OR_PASSWORD
            )
        }

        let clientDTO = new ClientDTO(
            client.dataValues.id,
            client.dataValues.username,
            client.dataValues.password,
            client.dataValues.role,
            client.dataValues.phone_number
        );

        let authDetailsDTO = await this.generateTokens(clientDTO);

        return authDetailsDTO

    }

    generateTokens = async (dto:ClientDTO ) => {


        let payloadDTO = new PayloadDTO(dto.toJSON());

        let accessToken = await TokenGenerator.generateAccessToken(payloadDTO);

        let refreshTokenToken = await TokenGenerator.generateRefreshToken(payloadDTO);

        return new AuthDetailsDTO(payloadDTO.toJSON(),accessToken,refreshTokenToken)

    }



    public register = async (details:any) => {

       

        const { username,password,phone_number } = details;

        if (!username || !password || !phone_number){
            throw new AppError(
                'Some data are missing! Please check and try again',
                400,
                StatusCodes.DATA_NOT_FOUND
            )
        }

        return await sequelize.transaction(async (transaction) => {

            // check whether the user is already registered
            const client = await ClientModel.findOne({
                where: {
                    username: username
                }
            });

            if (client){
                throw new AppError(
                    'User already registered',
                    400,
                    StatusCodes.DUPLICATE_ENTRY
                )
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // save the user
            const user = await ClientModel.create({
                username: username,
                password: hashedPassword,
                phone_number: phone_number,
                role: 'Client'
            },{
                transaction: transaction
            });

            console.log("This is user",user)
            

            let authDetailsDTO = await this.generateTokens(
                new ClientDTO(
                    user.dataValues.id,
                    user.dataValues.username,
                    user.dataValues.password,
                    user.dataValues.role,
                    user.dataValues.phone_number
                )
            );

            console.log("This is auth details",authDetailsDTO)

            //save refresh token in db
            await this.saveRefreshToken(authDetailsDTO, transaction)

            console.log("sucessfully registered")

            return authDetailsDTO


        });

       

        

    }

    saveRefreshToken = async (dto:AuthDetailsDTO, transaction?:Transaction) => {
        const expDate = new Date();
        expDate.setDate(expDate.getDate() + parseInt(process.env.REF_EXP_TIME_IN_DAYS || '7'));

        console.log("This is user id",dto.payload.user.id)


        await RefreshTokenModel.create({
            token: dto.refreshToken,
            exp_time: expDate,
            user_id: dto.payload.user.id
        }, {
            transaction: transaction
        });
    }

    public getWallet = async (id:number) => {

        console.log("This is id",id)

        const client = await ClientModel.findOne({
            where: {
                id: id
            }
        })
        
        const wallet = await WalletModel.findOne({
            where: {
                client_id: id
            }
        })

        // return both client and wallet
        return {
            client: client,
            wallet: wallet
        }


    }

    public sendSMS = async (details:any) => {
        
        const { user_id, content, reciver } = details;

        if (!user_id || !content || !reciver){
            throw new AppError(
                'Some data are missing! Please check and try again',
                400,
                StatusCodes.DATA_NOT_FOUND
            )
        }

        // find user id in wallet
        const wallet = await WalletModel.findOne({
            where: {
                client_id: user_id
            }
        })

        if (!wallet){
            // if wallet is not found, create a new wallet
            await WalletModel.create({
                count: 1,
                client_id: user_id
            })
        }else {
            wallet.increment('count', { by: 1 });
        }
        


        return "SMS sent successfully"

    }




}