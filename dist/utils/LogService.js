"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMicroService = exports.LogType = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "Info";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var LogType;
(function (LogType) {
    LogType["BOOKING_TRANSACTION"] = "booking-transaction";
    LogType["PAYMENT_TRANSACTION"] = "payment-transaction";
    LogType["USER_ACTIVITY"] = "user-activity";
})(LogType || (exports.LogType = LogType = {}));
var LogMicroService;
(function (LogMicroService) {
    LogMicroService["BACK_ALERT_SERVICE"] = "back-alert-service";
    LogMicroService["BACK_AUTH_SERVICE"] = "back-auth-service";
    LogMicroService["BACK_ML_SERVICE"] = "back-ml-service";
    LogMicroService["BACK_PAYMENT_SERVICE"] = "back-payment-service";
    LogMicroService["BACK_BEAUTY_WELLNESS_SERVICE"] = "back-Beauty-wellness-service";
    LogMicroService["BACK_EDUCATION_EXPERT_SERVICE"] = "back-Education-expert-service";
    LogMicroService["BACK_EVENT_SPACE_SERVICE"] = "back-Event-space-service";
    LogMicroService["BACK_FASHION_STYLE_SERVICE"] = "back-Fashion-style-service";
    LogMicroService["BACK_HEALTH_MEDICAL_SERVICE"] = "back-Health-medical-service";
    LogMicroService["BACK_HOME_WORKPLACE_SERVICE"] = "back-Home-workplace-service";
    LogMicroService["BACK_IN_DEMAND_SERVICE"] = "back-In-demand-service";
    LogMicroService["BACK_TRAVEL_STAY_SERVICE"] = "back-Travel-stay-service";
    LogMicroService["BACK_CONSUMER_SERVICE"] = "back-consumer-service";
    LogMicroService["BACK_PROVIDER_SERVICE"] = "back-provider-service";
})(LogMicroService || (exports.LogMicroService = LogMicroService = {}));
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
