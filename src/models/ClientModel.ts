import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/DbConnection';

export interface ClientAttributes {
    id: number;
    username: string;
    password:string;
    role:string;
    phone_number:string;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}

const ClientModel = sequelize.define<Model<ClientAttributes, ClientCreationAttributes>>(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        }
    },{
        tableName:'client',
        timestamps: true
    }
);

// make relations


export default ClientModel;
