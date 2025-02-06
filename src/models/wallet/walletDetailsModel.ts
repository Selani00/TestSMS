import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../db/DbConnection';
import CustomerModel from '../CustomersModel';

export interface WalletDetailsAttributes {
    id: number;
    value: number;
    customer_id: number;
}


export interface WalletDetailsCreationAttributes extends Optional<WalletDetailsAttributes, 'id'> {}

const WalletDetailsModel = sequelize.define<Model<WalletDetailsAttributes, WalletDetailsCreationAttributes>>(
    'WalletDetails',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        }
    },{
        tableName:'wallet_details',
        timestamps: true
    }
);

// make relations
CustomerModel.hasMany(WalletDetailsModel, {
    foreignKey: {
        name: 'customer_id',
        allowNull: false
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
}) 

WalletDetailsModel.belongsTo(CustomerModel, { foreignKey: 'customer_id' });

export default WalletDetailsModel;
