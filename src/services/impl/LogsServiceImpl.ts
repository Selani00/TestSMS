import {LogsService} from "../LogsService";
import LogsModel from "../../models/LogsModel";
import * as  Logs from '../../utils/LogService'


export class LogsServiceImpl implements LogsService{

    constructor() {
    }

    public getLogs = async () => {

        console.log("This is id")

        const logs = await LogsModel.findAll();
        

        // save logs
        await Logs.addLogs(
            new Date().toISOString(),
            // create content with username that this user os login
            "User is get logs",
            "Get Logs"
        )

        // return both client and wallet
        return logs 
    }

}