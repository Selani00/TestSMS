import {BillService} from "../BillService";
import ClientModel from "../../models/ClientModel";
import BillModel from "../../models/BillModel";

import * as  Logs from '../../utils/LogService'

export class BillServiceImpl implements BillService{


    constructor() {
    }

    public getTotalBill = async (id:number) => {

        console.log("This is id",id)

        const client = await BillModel.findOne({
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
        return client
    }





}