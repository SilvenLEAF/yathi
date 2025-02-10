import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Userinfo, UserinfoId } from './userinfo';

export interface OnlineuserAttributes {
  onlineId: number;
  onlineUuid: string;
  userId: number;
  socketId: string;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OnlineuserPk = "onlineId";
export type OnlineuserId = Onlineuser[OnlineuserPk];
export type OnlineuserOptionalAttributes = "onlineId" | "onlineUuid" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type OnlineuserCreationAttributes = Optional<OnlineuserAttributes, OnlineuserOptionalAttributes>;

export class Onlineuser extends Model<OnlineuserAttributes, OnlineuserCreationAttributes> implements OnlineuserAttributes {
  onlineId!: number;
  onlineUuid!: string;
  userId!: number;
  socketId!: string;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // Onlineuser belongsTo Userinfo via userId
  user!: Userinfo;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Onlineuser {
    return Onlineuser.init({
    onlineId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'online_id'
    },
    onlineUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'online_uuid'
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'userinfo',
        key: 'user_id'
      },
      unique: "onlineuser_user_id_key",
      field: 'user_id'
    },
    socketId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'socket_id'
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'updated_by'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'updated_at'
    }
  }, {
    sequelize,
    tableName: 'onlineuser',
    schema: 'yathi',
    timestamps: false,
    indexes: [
      {
        name: "onlineuser_pkey",
        unique: true,
        fields: [
          { name: "online_id" },
        ]
      },
      {
        name: "onlineuser_user_id_key",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
