import { ClientDtoInterface } from "../types/DtoTypes";


export class ClientDTO {

    private id :number;
    private username :string;
    private name:string;
    private password:string;
    private role:string;
    private phone_number:string;
    private nic:string;
    private accout_status:string;
    private address:string;
    private br_number:string;
    private br_doc_img_path_1:string;
    private br_doc_img_path_2:string;
    private status:string;


    constructor(id: number, username: string, name:string, password: string, role: string, phone_number: string, nic: string, accout_status: string, address: string, br_number: string, br_doc_img_path_1: string, br_doc_img_path_2: string, status: string) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.password = password;
        this.role = role;
        this.phone_number = phone_number;
        this.nic = nic;
        this.accout_status = accout_status;
        this.address = address;
        this.br_number = br_number;
        this.br_doc_img_path_1 = br_doc_img_path_1;
        this.br_doc_img_path_2 = br_doc_img_path_2;
        this.status = status;
    }


    

    get getId(): number {
        return this.id;
    }

    set setId(value: number) {
        this.id = value;
    }

    get getUsername(): string {
        return this.username;
    }

    set setUsername(value: string) {
        this.username = value;
    }

    get getName(): string {
        return this.name;
    }

    set setName(value: string) {
        this.name = value;
    }

    get getPassword(): string {
        return this.password;
    }

    set setPassword(value: string) {
        this.password = value;
    }

    get getRole(): string {
        return this.role;
    }

    set setRole(value: string) {
        this.role = value;
    }

    get getPhoneNumber(): string {
        return this.phone_number;
    }

    set setPhoneNumber(value: string) {
        this.phone_number = value;
    }

    get getNic(): string {
        return this.nic;
    }

    set setNic(value: string) {
        this.nic = value;
    }

    get getAccoutStatus(): string {
        return this.accout_status;
    }

    set setAccoutStatus(value: string) {
        this.accout_status = value;
    }

    get getAddress(): string {
        return this.address;
    }

    set setAddress(value: string) {
        this.address = value;
    }

    get getBrNumber(): string {
        return this.br_number;
    }

    set setBrNumber(value: string) {
        this.br_number = value;
    }

    get getBrDocImgPath1(): string {
        return this.br_doc_img_path_1;
    }

    set setBrDocImgPath1(value: string) {
        this.br_doc_img_path_1 = value;
    }

    get getBrDocImgPath2(): string {
        return this.br_doc_img_path_2;
    }

    set setBrDocImgPath2(value: string) {
        this.br_doc_img_path_2 = value;
    }

    get getStatus(): string {
        return this.status;
    }

    set setStatus(value: string) {
        this.status = value;
    }

    toJSON(): ClientDtoInterface {
        return {
            id: this.id,
            username: this.username,
            name: this.name,
            password: this.password,
            role: this.role,
            phone_number: this.phone_number,
            nic: this.nic,
            accout_status: this.accout_status,
            address: this.address,
            br_number: this.br_number,
            br_doc_img_path_1: this.br_doc_img_path_1,
            br_doc_img_path_2: this.br_doc_img_path_2,
            status: this.status
        }
    }
}