import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Userinfo, UserinfoId } from './userinfo';

export interface UserlocationAttributes {
  locationId: number;
  locationUuid: string;
  userId: number;
  latitude: number;
  longitude: number;
  locationGeography: any;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserlocationPk = "locationId";
export type UserlocationId = Userlocation[UserlocationPk];
export type UserlocationOptionalAttributes = "locationId" | "locationUuid" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type UserlocationCreationAttributes = Optional<UserlocationAttributes, UserlocationOptionalAttributes>;

export class Userlocation extends Model<UserlocationAttributes, UserlocationCreationAttributes> implements UserlocationAttributes {
  locationId!: number;
  locationUuid!: string;
  userId!: number;
  latitude!: number;
  longitude!: number;
  locationGeography!: any;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // Userlocation belongsTo Userinfo via userId
  user!: Userinfo;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Userlocation {
    return Userlocation.init({
    locationId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'location_id'
    },
    locationUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'location_uuid'
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'userinfo',
        key: 'user_id'
      },
      unique: "userlocation_user_id_key",
      field: 'user_id'
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    locationGeography: {
      type: DataTypes.GEOGRAPHY('Point', 4326),
      allowNull: false,
      field: 'location_geography'
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
    }
  }, {
    sequelize,
    tableName: 'userlocation',
    schema: 'yathi',
    timestamps: true,
    indexes: [
      {
        name: "userlocation_pkey",
        unique: true,
        fields: [
          { name: "location_id" },
        ]
      },
      {
        name: "userlocation_user_id_key",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
