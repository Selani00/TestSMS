import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/DbConnection';

export interface RefreshTokenAttributes {
    id: number;
    token: string;
    exp_time: Date;
    user_id: number
}

export interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, 'id'> {}

const RefreshTokenModel = sequelize.define<Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>>(
    'Refresh_token',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        exp_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        tableName:'refresh_token'
    }
);

export default RefreshTokenModel;
