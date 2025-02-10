import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Userinfo, UserinfoId } from './userinfo';

export interface BlockeduserAttributes {
  blockedId: number;
  blockedUuid: string;
  blockerId: number;
  blockedUserId: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BlockeduserPk = "blockedId";
export type BlockeduserId = Blockeduser[BlockeduserPk];
export type BlockeduserOptionalAttributes = "blockedId" | "blockedUuid" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type BlockeduserCreationAttributes = Optional<BlockeduserAttributes, BlockeduserOptionalAttributes>;

export class Blockeduser extends Model<BlockeduserAttributes, BlockeduserCreationAttributes> implements BlockeduserAttributes {
  blockedId!: number;
  blockedUuid!: string;
  blockerId!: number;
  blockedUserId!: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // Blockeduser belongsTo Userinfo via blockedUserId
  blockedUser!: Userinfo;
  getBlockedUser!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setBlockedUser!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createBlockedUser!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;
  // Blockeduser belongsTo Userinfo via blockerId
  blocker!: Userinfo;
  getBlocker!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setBlocker!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createBlocker!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;
  // Blockeduser belongsTo Userinfo via createdBy
  createdByUserinfo!: Userinfo;
  getCreatedByUserinfo!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setCreatedByUserinfo!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createCreatedByUserinfo!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;
  // Blockeduser belongsTo Userinfo via updatedBy
  updatedByUserinfo!: Userinfo;
  getUpdatedByUserinfo!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setUpdatedByUserinfo!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createUpdatedByUserinfo!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Blockeduser {
    return Blockeduser.init({
    blockedId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'blocked_id'
    },
    blockedUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'blocked_uuid'
    },
    blockerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'userinfo',
        key: 'user_id'
      },
      unique: "blockeduser_blocker_id_blocked_user_id_key",
      field: 'blocker_id'
    },
    blockedUserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'userinfo',
        key: 'user_id'
      },
      unique: "blockeduser_blocker_id_blocked_user_id_key",
      field: 'blocked_user_id'
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'userinfo',
        key: 'user_id'
      },
      field: 'created_by'
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'userinfo',
        key: 'user_id'
      },
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
    tableName: 'blockeduser',
    schema: 'yathi',
    timestamps: false,
    indexes: [
      {
        name: "blockeduser_blocker_id_blocked_user_id_key",
        unique: true,
        fields: [
          { name: "blocker_id" },
          { name: "blocked_user_id" },
        ]
      },
      {
        name: "blockeduser_pkey",
        unique: true,
        fields: [
          { name: "blocked_id" },
        ]
      },
    ]
  });
  }
}
