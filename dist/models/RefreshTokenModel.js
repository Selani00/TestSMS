"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DbConnection_1 = __importDefault(require("../db/DbConnection"));
const RefreshTokenModel = DbConnection_1.default.define('Refresh_token', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: false,
    },
    exp_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'refresh_token'
});
exports.default = RefreshTokenModel;
