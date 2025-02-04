import {PayloadDTO} from "../dtos/PayloadDTO";

export interface ClientDtoInterface {
    id: number;
    username: string;
    name:string;
    password:string;
    role:string;
    phone_number:string;
    nic:string;
    accout_status:string;
    address:string;
    br_number:string;
    br_doc_img_path_1:string;
    br_doc_img_path_2:string;
    status:string;

}

export interface PayloadDtoInterface{
    user: ClientDtoInterface;
}

export interface AuthDetailsDTOInterface {
    payload:PayloadDTO | PayloadDtoInterface,
    accessToken:string,
    refreshToken:string,
}
