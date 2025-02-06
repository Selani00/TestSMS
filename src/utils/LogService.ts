import LogsModel from "../models/LogsModel"

export const addLogs = async (date_time: string, content : string , reason: string) => {

    if (!date_time || !content || !reason){
        throw new Error("Some data are missing")
    }

    await LogsModel.create({
        date_time,
        content,
        reason
    })

}

