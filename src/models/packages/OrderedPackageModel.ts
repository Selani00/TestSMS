import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../db/DbConnection';
import SMSServiceModel from '../sms/SMSServiceModel';


export interface OrderedPackagesAttributes {
    id: number;
    sms_service_id: number;
    ordered_date_time: string;
    last_payment_date_time: string;
    due_payment_date_time: string;
    balance_sms_count: number;
    payment_status: string;
    is_intial_payment_paid: boolean;
}


export interface OrderedPackagesCreationAttributes extends Optional<OrderedPackagesAttributes, 'id'> {}

const OrderPackagesModel = sequelize.define<Model<OrderedPackagesAttributes, OrderedPackagesCreationAttributes>>(
    'OrderedPackages',
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
        ordered_date_time: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        last_payment_date_time: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        due_payment_date_time: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        balance_sms_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        payment_status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        is_intial_payment_paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
        
    },{
        tableName:'ordered_packages',
        timestamps: true
    }
);

// make relations
SMSServiceModel.hasMany(OrderPackagesModel, {
    foreignKey: {
        name: 'sms_service_id',
        allowNull: false
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
}) 

OrderPackagesModel.belongsTo(SMSServiceModel, { foreignKey: 'sms_service_id' });




export default OrderPackagesModel;
