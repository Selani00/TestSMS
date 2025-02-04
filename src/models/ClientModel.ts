import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/DbConnection';

export interface ClientAttributes {
    id: number;
    username: string;
    name:string;
    password:string;
    role:string;
    phone_number:string;
    nic:string;
    accout_status:string;
    address:string;
    br_number:string;
    br_doc_img_path_1:string;
    br_doc_img_path_2:string;
    status:string;
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
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
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
        },
        nic: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        accout_status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        br_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        br_doc_img_path_1: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        br_doc_img_path_2: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            defaultValue: 'active'
        }
        
    },{
        tableName:'client',
        timestamps: true
    }
);

// make relations


export default ClientModel;
