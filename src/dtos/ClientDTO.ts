import { ClientDtoInterface } from "../types/DtoTypes";


export class ClientDTO {

    private id :number;
    private username :string;
    private password:string;
    private role:string;
    private phone_number:string;


    constructor(id: number, username: string, password: string, role: string, phone_number: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.phone_number = phone_number;
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

    toJSON(): ClientDtoInterface {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            role: this.role,
            phone_number: this.phone_number
        }
    }
}