import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './user';

export interface UserinfoAttributes {
  userId: number;
  userUuid: string;
  email: string;
  firstname?: string;
  lastname?: string;
  picture?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  zodiac?: string;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserinfoPk = "userId";
export type UserinfoId = Userinfo[UserinfoPk];
export type UserinfoOptionalAttributes = "userUuid" | "firstname" | "lastname" | "picture" | "age" | "gender" | "occupation" | "zodiac" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type UserinfoCreationAttributes = Optional<UserinfoAttributes, UserinfoOptionalAttributes>;

export class Userinfo extends Model<UserinfoAttributes, UserinfoCreationAttributes> implements UserinfoAttributes {
  userId!: number;
  userUuid!: string;
  email!: string;
  firstname?: string;
  lastname?: string;
  picture?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  zodiac?: string;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // Userinfo belongsTo User via userId
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Userinfo {
    return Userinfo.init({
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_id'
      },
      field: 'user_id'
    },
    userUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'user_uuid'
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "userinfo_email_key"
    },
    firstname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    age: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zodiac: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'userinfo',
    schema: 'yathi',
    timestamps: true,
    indexes: [
      {
        name: "userinfo_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "userinfo_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
