"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
class CustomResponse {
    constructor(status, message, data, totalPages) {
        this._status = status;
        this._message = message;
        this._data = data;
        this._totalPages = totalPages;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
    get totalPages() {
        return this._totalPages;
    }
    set totalPages(value) {
        this._totalPages = value;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    toJSON() {
        return {
            status: this.status,
            message: this.message,
            data: this.data,
            totalPages: this.totalPages
        };
    }
}
exports.CustomResponse = CustomResponse;
