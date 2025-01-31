import {PayloadDtoInterface, ClientDtoInterface } from "../types/DtoTypes";

export type UserType = ClientDtoInterface ;

export class PayloadDTO {

    private _user?:any;

    constructor(user: any) {
        this._user = user;
    }

    get user(): any {
        return this._user;
    }

    set user(value: any) {
        this._user = value;
    }

    toJSON(){
        return{
            user: this._user
        }
    }
}