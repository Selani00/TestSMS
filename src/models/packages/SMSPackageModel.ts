import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../db/DbConnection';
import OrderPackagesModel from './OrderedPackageModel';


export interface SMSPackagesAttributes {
    id: number;
    ordered_package_id: number;
    sms_pack_count: number;
    msg_fee : number;
    valid_period : number;
    monthly_payment : number;
    initial_payment : number;
    name : string;
    type : string;
}


export interface SMSPackagesCreationAttributes extends Optional<SMSPackagesAttributes, 'id'> {}

const SMSPackagesModel = sequelize.define<Model<SMSPackagesAttributes, SMSPackagesCreationAttributes>>(
    'SMSPackages',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        ordered_package_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        sms_pack_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        msg_fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        valid_period: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        monthly_payment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        initial_payment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        }

        
    },{
        tableName:'sms_packages',
        timestamps: true
    }
);

// make relations
OrderPackagesModel.hasMany(SMSPackagesModel, {
    foreignKey: {
        name: 'ordered_package_id',
        allowNull: false
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
}) 

OrderPackagesModel.belongsTo(SMSPackagesModel, { foreignKey: 'sms_service_id' });

export default SMSPackagesModel;
