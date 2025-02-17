import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../db/DbConnection';
import SMSServiceModel from './SMSServiceModel';

export interface SMSMasksAttributes {
    id: number;
    sms_service_id: number;
    mask_status: string;
    name : string;
    admin_note : string;
    customer_note : string;
    created_date_time : string;
}


export interface SMSMasksCreationAttributes extends Optional<SMSMasksAttributes, 'id'> {}

const SMSMasksModel = sequelize.define<Model<SMSMasksAttributes, SMSMasksCreationAttributes>>(
    'SMSMasks',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        sms_service_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        mask_status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        admin_note: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        customer_note: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        created_date_time : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        }
    },{
        tableName:'sms_masks',
        timestamps: false
    }
);

// make relations
SMSServiceModel.hasMany(SMSMasksModel, {
    foreignKey: {
        name: 'sms_service_id',
        allowNull: false
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
}) 

SMSMasksModel.belongsTo(SMSServiceModel, { foreignKey: 'sms_service_id' });

export default SMSMasksModel;
