import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Userinfo, UserinfoId } from './userinfo';

export interface ReporteduserAttributes {
  reportedId: number;
  reportedUuid: string;
  reporterId: number;
  reportedUserId: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ReporteduserPk = "reportedId";
export type ReporteduserId = Reporteduser[ReporteduserPk];
export type ReporteduserOptionalAttributes = "reportedId" | "reportedUuid" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type ReporteduserCreationAttributes = Optional<ReporteduserAttributes, ReporteduserOptionalAttributes>;

export class Reporteduser extends Model<ReporteduserAttributes, ReporteduserCreationAttributes> implements ReporteduserAttributes {
  reportedId!: number;
  reportedUuid!: string;
  reporterId!: number;
  reportedUserId!: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // Reporteduser belongsTo Userinfo via createdBy
  createdByUserinfo!: Userinfo;
  getCreatedByUserinfo!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setCreatedByUserinfo!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createCreatedByUserinfo!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;
  // Reporteduser belongsTo Userinfo via reportedUserId
  reportedUser!: Userinfo;
  getReportedUser!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setReportedUser!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createReportedUser!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;
  // Reporteduser belongsTo Userinfo via reporterId
  reporter!: Userinfo;
  getReporter!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setReporter!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createReporter!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;
  // Reporteduser belongsTo Userinfo via updatedBy
  updatedByUserinfo!: Userinfo;
  getUpdatedByUserinfo!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setUpdatedByUserinfo!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createUpdatedByUserinfo!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Reporteduser {
    return Reporteduser.init({
    reportedId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'reported_id'
    },
    reportedUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'reported_uuid'
    },
    reporterId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'userinfo',
        key: 'user_id'
      },
      unique: "reporteduser_reporter_id_reported_user_id_key",
      field: 'reporter_id'
    },
    reportedUserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'userinfo',
        key: 'user_id'
      },
      unique: "reporteduser_reporter_id_reported_user_id_key",
      field: 'reported_user_id'
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
    tableName: 'reporteduser',
    schema: 'yathi',
    timestamps: false,
    indexes: [
      {
        name: "reporteduser_pkey",
        unique: true,
        fields: [
          { name: "reported_id" },
        ]
      },
      {
        name: "reporteduser_reporter_id_reported_user_id_key",
        unique: true,
        fields: [
          { name: "reporter_id" },
          { name: "reported_user_id" },
        ]
      },
    ]
  });
  }
}
