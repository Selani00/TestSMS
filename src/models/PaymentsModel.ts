import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/DbConnection';
import CustomersModel from './CustomersModel';

export interface PaymentsAttributes {
    id: number;
    customer_id : number;
    type: string;
    paid_value: string;
    if_pay_slip_img_path : string;
    admin_reviewed_datetime : string;
    payment_receipt_img_path : string;
    isapproved : boolean;
    customer_note : string;
    admin_note : string;
}


export interface PaymentsCreationAttributes extends Optional<PaymentsAttributes, 'id'> {}

const PaymentsModel = sequelize.define<Model<PaymentsAttributes, PaymentsCreationAttributes>>(
    'Payments',
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
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        paid_value: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        if_pay_slip_img_path : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        admin_reviewed_datetime : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        payment_receipt_img_path : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        isapproved : {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        customer_note : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        admin_note : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        }
        

    },{
        tableName:'payments',
        timestamps: false
    }
);

// make relations
CustomersModel.hasMany(PaymentsModel, {
    foreignKey: {
        name: 'customer_id',
        allowNull: false
    },
    onDelete:"CASCADE",
    onUpdate:"CASCADE",
})

PaymentsModel.belongsTo(CustomersModel, { foreignKey: 'customer_id' });


export default PaymentsModel;
