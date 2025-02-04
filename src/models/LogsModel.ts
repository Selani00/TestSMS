import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/DbConnection';

export interface LogsAttributes {
    id: number;
    content: string;
    date_time:string;
    reason:string;
}

export interface LogsCreationAttributes extends Optional<LogsAttributes, 'id'> {}

const LogsModel = sequelize.define<Model<LogsAttributes, LogsCreationAttributes>>(
    'Logs',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },

        date_time: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },

        reason: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        
    },{
        tableName:'logs',
        timestamps: true
    }
);



export default LogsModel;
