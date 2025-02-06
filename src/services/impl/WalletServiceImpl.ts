import {WalletService} from "../WalletService";
import ClientModel from "../../models/CustomersModel";
import WalletModel from "../../models/wallet/walletModel";

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