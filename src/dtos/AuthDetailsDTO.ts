import {PayloadDTO} from "./PayloadDTO";
import {AuthDetailsDTOInterface, PayloadDtoInterface} from "../types/DtoTypes";

export class AuthDetailsDTO {

    private _payload:PayloadDTO | PayloadDtoInterface;
    private _accessToken:string;
    private _refreshToken:string

    constructor(payload: PayloadDTO | PayloadDtoInterface, accessToken: string, refreshToken: string) {
        this._payload = payload;
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;
    }

    get payload(): PayloadDTO | PayloadDtoInterface {
        return this._payload;
    }

    set payload(value: PayloadDTO | PayloadDtoInterface) {
        this._payload = value;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    set accessToken(value: string) {
        this._accessToken = value;
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    set refreshToken(value: string) {
        this._refreshToken = value;
    }

    toJSON(): AuthDetailsDTOInterface{
        return{
            'payload':this._payload,
            'accessToken':this._accessToken,
            'refreshToken':this._refreshToken
        }
    }
}