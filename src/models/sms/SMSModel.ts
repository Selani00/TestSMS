import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../db/DbConnection';
import SMSServiceModel from './SMSServiceModel';
import SMSMasksModel from './SMSMasks';

export interface SMSAttributes {
    id: number;
    sms_service_id: number;
    sms_masks_id : number;
    is_diliverd: boolean;
    sms_content : string;
    phone_number : string;
    finished_date_time : string;
    started_date_time : string;
}


export interface SMSCreationAttributes extends Optional<SMSAttributes, 'id'> {}

const SMSModel = sequelize.define<Model<SMSAttributes, SMSCreationAttributes>>(
    'SMS',
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
        sms_masks_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        is_diliverd: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        sms_content : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        phone_number : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        finished_date_time : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        started_date_time : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        }
    },{
        tableName:'sms',
        timestamps: false
    }
);

// make relations
SMSServiceModel.hasMany(SMSModel, {
    foreignKey: {
        name: 'sms_service_id',
        allowNull: false
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
}) 

SMSModel.belongsTo(SMSServiceModel, { foreignKey: 'sms_service_id' });


SMSMasksModel.belongsTo(SMSModel, { foreignKey: 'sms_masks_id' });

export default SMSModel;
