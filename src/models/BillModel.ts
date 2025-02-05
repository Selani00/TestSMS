import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/DbConnection';
import ClientModel from './ClientModel';

export interface BillsAttributes {
    id: number;
    client_id : number;
    pay_value: number;
    reason: string;
    billed_date: string;
    content : string;
    ispaid : boolean;
    final_date : string;
    interest : number;
}


export interface BillsCreationAttributes extends Optional<BillsAttributes, 'id'> {}

const BillModel = sequelize.define<Model<BillsAttributes, BillsCreationAttributes>>(
    'bills',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        pay_value: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        billed_date: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        content : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        ispaid : {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        final_date : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        interest : {
            type: DataTypes.STRING,
            allowNull: false
        }

    },{
        tableName:'bills',
        timestamps: true
    }
);

// make relations
BillModel.belongsTo(ClientModel, { foreignKey: 'client_id' });



export default BillModel;
