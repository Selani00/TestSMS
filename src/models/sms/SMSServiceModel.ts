import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../db/DbConnection';
import CustomerModel from '../CustomersModel';

export interface SMSServiceAttributes {
    id: number;
    customer_id: number;
    service_status: string;   
    note : string;
}


export interface SMSServiceCreationAttributes extends Optional<SMSServiceAttributes, 'id'> {}

const SMSServiceModel = sequelize.define<Model<SMSServiceAttributes, SMSServiceCreationAttributes>>(
    'SMSService',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        service_status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        }
    },{
        tableName:'sms_service',
        timestamps: false
    }
);

// make relations

SMSServiceModel.belongsTo(CustomerModel, { foreignKey: 'customer_id' });


export default SMSServiceModel;
