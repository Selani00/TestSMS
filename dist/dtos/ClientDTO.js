"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDTO = void 0;
class ClientDTO {
    constructor(id, username, password, role, phone_number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.phone_number = phone_number;
    }
    get getId() {
        return this.id;
    }
    set setId(value) {
        this.id = value;
    }
    get getUsername() {
        return this.username;
    }
    set setUsername(value) {
        this.username = value;
    }
    get getPassword() {
        return this.password;
    }
    set setPassword(value) {
        this.password = value;
    }
    get getRole() {
        return this.role;
    }
    set setRole(value) {
        this.role = value;
    }
    get getPhoneNumber() {
        return this.phone_number;
    }
    set setPhoneNumber(value) {
        this.phone_number = value;
    }
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            role: this.role,
            phone_number: this.phone_number
        };
    }
}
exports.ClientDTO = ClientDTO;
