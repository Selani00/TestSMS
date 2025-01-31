import {ServicesEnum} from "./ServicesEnum";
import process from "process";
import * as TokenGenerator from './TokenGenerator'
export enum LogLevel {
    INFO='Info'
}

export enum LogType {
    BOOKING_TRANSACTION = "booking-transaction",
    PAYMENT_TRANSACTION = "payment-transaction",
    USER_ACTIVITY = "user-activity",
}

export enum LogMicroService {
    BACK_ALERT_SERVICE = "back-alert-service",
    BACK_AUTH_SERVICE = "back-auth-service",
    BACK_ML_SERVICE = "back-ml-service",
    BACK_PAYMENT_SERVICE = "back-payment-service",
    BACK_BEAUTY_WELLNESS_SERVICE = "back-Beauty-wellness-service",
    BACK_EDUCATION_EXPERT_SERVICE = "back-Education-expert-service",
    BACK_EVENT_SPACE_SERVICE = "back-Event-space-service",
    BACK_FASHION_STYLE_SERVICE = "back-Fashion-style-service",
    BACK_HEALTH_MEDICAL_SERVICE = "back-Health-medical-service",
    BACK_HOME_WORKPLACE_SERVICE = "back-Home-workplace-service",
    BACK_IN_DEMAND_SERVICE = "back-In-demand-service",
    BACK_TRAVEL_STAY_SERVICE = "back-Travel-stay-service",
    BACK_CONSUMER_SERVICE = "back-consumer-service",
    BACK_PROVIDER_SERVICE = "back-provider-service",
}

// export const addErrorLog = async (level:LogLevel, service:LogMicroService, msg:string) => {

//     //send request to Alert service to send otp 📩

//     //get out
//     let out = await TokenGenerator.generateOUToken(ServicesEnum.ALERT, secret, expiresIn);

//     const data = {
//         "timestamp":new Date(),
//         "level": level || "Info",
//         "service": service || 'back-auth-service',
//         "data": msg || 'Error'
//     }

//     const headers = {
//         // 'x-acc-authorization': token,
//         'Authorization': out,
//         'Content-Type': 'application/json',
//     };

//     const url = `${process.env.ALERT_SEIVCE_BASE_URL}save/logs/microserv`;

//     try {
//         await RequestHandler.makeRequest(data, headers, url, 'post')
//     }catch (e) {
//         console.log('Error in log service 💥💥')
//         console.log(e)
//     }

// }