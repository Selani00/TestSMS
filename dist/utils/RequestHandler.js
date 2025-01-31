"use strict";
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
exports.makeRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const AppError_1 = require("./AppError");
const makeRequest = (data, headers, url, method) => __awaiter(void 0, void 0, void 0, function* () {
    // return await axios.post(url, data,{
    //     headers:headers
    // })
    return yield (0, axios_1.default)({
        method: method, // dynamically set the method
        url: url,
        data: data,
        headers: headers
    })
        .then(function (response) {
        // handle success
        // res.status(200).send(response.data);
        console.log(response === null || response === void 0 ? void 0 : response.data);
        return response === null || response === void 0 ? void 0 : response.data;
    })
        .catch(function (error) {
        var _a, _b, _c, _d, _e, _f;
        // handle error
        console.log((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data);
        throw new AppError_1.AppError((_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message, ((_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.status) || 500, (_f = (_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.status);
    });
});
exports.makeRequest = makeRequest;
