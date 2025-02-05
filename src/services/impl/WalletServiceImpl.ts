import {AppError} from "../../utils/AppError";
import {StatusCodes} from "../../utils/StatusCodes";
import {Transaction} from "sequelize";
import process from "process";
import * as TokenGenerator from "../../utils/TokenGenerator";
import RefreshTokenModel from "../../models/RefreshTokenModel";
import {WalletService} from "../WalletService";
import sequelize from "../../db/DbConnection";
import bcrypt from "bcryptjs";
import ClientModel from "../../models/ClientModel";
import WalletModel from "../../models/walletModel";

import * as  Logs from '../../utils/LogService'

export class WalletServiceImpl implements WalletService{


    constructor() {
    }




    public getBalance = async (id:number) => {

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

        // save logs
        await Logs.addLogs(
            new Date().toISOString(),
            // create content with username that this user os login
            "User with id " + id + " is get wallet",
            "Get Wallet"
        )

        // return both client and wallet
        return {
            client: client,
            wallet: wallet
        }

    }





}