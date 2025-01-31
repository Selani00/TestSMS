"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DbConnection_1 = __importDefault(require("../db/DbConnection"));
const ClientModel = DbConnection_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    }
}, {
    tableName: 'client',
    timestamps: true
});
// make relations
exports.default = ClientModel;
