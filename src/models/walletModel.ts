import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/DbConnection';
import ClientModel from './ClientModel';

export interface WalletAttributes {
    id: number;
    current_value: number;
    client_id: number;
}


export interface WalletCreationAttributes extends Optional<WalletAttributes, 'id'> {}

const WalletModel = sequelize.define<Model<WalletAttributes, WalletCreationAttributes>>(
    'Wallet',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        current_value: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        }
    },{
        tableName:'wallet',
        timestamps: true
    }
);

// make relations
WalletModel.belongsTo(ClientModel, { foreignKey: 'client_id' });



export default WalletModel;
