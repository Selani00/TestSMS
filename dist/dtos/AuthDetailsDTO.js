"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDetailsDTO = void 0;
class AuthDetailsDTO {
    constructor(payload, accessToken, refreshToken) {
        this._payload = payload;
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;
    }
    get payload() {
        return this._payload;
    }
    set payload(value) {
        this._payload = value;
    }
    get accessToken() {
        return this._accessToken;
    }
    set accessToken(value) {
        this._accessToken = value;
    }
    get refreshToken() {
        return this._refreshToken;
    }
    set refreshToken(value) {
        this._refreshToken = value;
    }
    toJSON() {
        return {
            'payload': this._payload,
            'accessToken': this._accessToken,
            'refreshToken': this._refreshToken
        };
    }
}
exports.AuthDetailsDTO = AuthDetailsDTO;
