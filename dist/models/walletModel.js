"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DbConnection_1 = __importDefault(require("../db/DbConnection"));
const ClientModel_1 = __importDefault(require("./ClientModel"));
const WalletModel = DbConnection_1.default.define('Wallet', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    count: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    client_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'wallet',
    timestamps: true
});
// make relations
WalletModel.belongsTo(ClientModel_1.default, { foreignKey: 'client_id' });
exports.default = WalletModel;
