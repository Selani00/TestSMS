"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadDTO = void 0;
class PayloadDTO {
    constructor(user) {
        this._user = user;
    }
    get user() {
        return this._user;
    }
    set user(value) {
        this._user = value;
    }
    toJSON() {
        return {
            user: this._user
        };
    }
}
exports.PayloadDTO = PayloadDTO;
