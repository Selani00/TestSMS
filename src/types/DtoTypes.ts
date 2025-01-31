import {PayloadDTO} from "../dtos/PayloadDTO";

export interface ClientDtoInterface {
    id: number;
    username: string;
    password:string;
    role:string;
    phone_number:string;
}

export interface PayloadDtoInterface{
    user: ClientDtoInterface;
}

export interface AuthDetailsDTOInterface {
    payload:PayloadDTO | PayloadDtoInterface,
    accessToken:string,
    refreshToken:string,
}
