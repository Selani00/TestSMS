import {AppError} from "../../utils/AppError";
import {StatusCodes} from "../../utils/StatusCodes";
import {Transaction} from "sequelize";
import process from "process";
import * as TokenGenerator from "../../utils/TokenGenerator";
import RefreshTokenModel from "../../models/RefreshTokenModel";
import {ClientService} from "../AccountService";
import sequelize from "../../db/DbConnection";
import bcrypt from "bcryptjs";
import ClientModel from "../../models/ClientModel";
import {PayloadDTO} from "../../dtos/PayloadDTO";
import { ClientDTO } from "../../dtos/ClientDTO";
import {AuthDetailsDTO} from "../../dtos/AuthDetailsDTO";
import WalletModel from "../../models/walletModel";

import * as  Logs from '../../utils/LogService'

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

        return await sequelize.transaction(async (transaction) => {
            let isMatch =  await bcrypt.compare(password, client.dataValues.password);

            if (!isMatch){
                throw new AppError(
                    'Invalid username or password!',
                    401,
                    StatusCodes.INVALID_USERNAME_OR_PASSWORD
                )
            }

            // check is the status is active
            if (client.dataValues.status === 'Inactive'){
                    throw new AppError(
                        'User deleted this account',
                        401,
                        StatusCodes.INVALID_USERNAME_OR_PASSWORD
                )
            }

            let clientDTO = new ClientDTO(
                client.dataValues.id,
                client.dataValues.username,
                client.dataValues.name,
                client.dataValues.password,
                client.dataValues.role,
                client.dataValues.phone_number,
                client.dataValues.nic,
                client.dataValues.accout_status,
                client.dataValues.address,
                client.dataValues.br_number,
                client.dataValues.br_doc_img_path_1,
                client.dataValues.br_doc_img_path_2
                ,client.dataValues.status
            );

            let authDetailsDTO = await this.generateTokens(clientDTO);

            // save logs
            await Logs.addLogs(
                new Date().toISOString(), 
                // create content with username that this user os login
                "User with username " + username + " is logged in", 
                "Login"
            )

            // save refresh token
            await this.saveRefreshToken(authDetailsDTO,transaction);

            return authDetailsDTO

        });

        

    }

    generateTokens = async (dto:ClientDTO ) => {

        let payloadDTO = new PayloadDTO(dto.toJSON());
        let accessToken = await TokenGenerator.generateAccessToken(payloadDTO);
        let refreshTokenToken = await TokenGenerator.generateRefreshToken(payloadDTO);

        return new AuthDetailsDTO(payloadDTO.toJSON(),accessToken,refreshTokenToken)

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



    public register = async (details:any) => {

        const { username,password,name,phone_number,nic,accout_status, address, br_number, br_doc_img_path_1, br_doc_img_path_2} = details;

        if (!username || !password || !name || !phone_number || !nic){
            throw new AppError(
                'Some data are missing! Please check and try again',
                400,
                StatusCodes.DATA_NOT_FOUND
            )
        }

        

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
                name: name,
                password: hashedPassword,
                phone_number: phone_number,
                role: 'Client',
                nic: nic,
                accout_status: accout_status,
                address: address,
                br_number: br_number,
                br_doc_img_path_1: br_doc_img_path_1,
                br_doc_img_path_2: br_doc_img_path_2,
                status: 'Active'
            });


            // save logs
            await Logs.addLogs(
                new Date().toISOString(), 
                // create content with username that this user os login
                "User with username " + username + " is registered", 
                "Register"
            )

            console.log("sucessfully registered")
            return user

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
                current_value: 1,
                client_id: user_id
            })
        }else {
            wallet.increment('current_value', { by: 1 });
        }
        
        // save logs
        await Logs.addLogs(
            new Date().toISOString(),
            // create content with username that this user os login
            "User with id " + user_id + " is send SMS",
            "Send SMS"
        )

        return "SMS sent successfully"

    }

    public logout = async (id:number) => {

        const response = await RefreshTokenModel.destroy({
            where: {
                user_id: id
            }
        })

        if (response === 0){
            throw new AppError(
                'Logout failed',
                400,
                StatusCodes.UNHANDLED_ERROR
            )
        }

        // save logs
        await Logs.addLogs(
            new Date().toISOString(),
            "User with id " + id + " is logout",
            "Logout"
        )

        return "Logout successful"

    }

    public deleteClient = async (id:number) => {

        // find if client exists
        const client = await ClientModel.findOne({
            where: {
                id: id
            }
        })

        if (!client){
            throw new AppError(
                'Client not found',
                404,
                StatusCodes.DATA_NOT_FOUND
            )
        }

        // save logs
        await Logs.addLogs(
            new Date().toISOString(),
            "User with id " + id + " is deleted",
            "Delete"
        )

        // if client exists change status to inactive in the client table
        client.update({
            status: 'Inactive'
        })
        
    }




}