import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Userinfo, UserinfoCreationAttributes, UserinfoId } from './userinfo';

export interface UserAttributes {
  userId: number;
  username?: string;
  password: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserPk = "userId";
export type UserId = User[UserPk];
export type UserOptionalAttributes = "username" | "createdAt" | "updatedAt";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  userId!: number;
  username?: string;
  password!: string;
  email!: string;
  createdAt?: Date;
  updatedAt?: Date;

  // User hasOne Userinfo via userId
  userinfo!: Userinfo;
  getUserinfo!: Sequelize.HasOneGetAssociationMixin<Userinfo>;
  setUserinfo!: Sequelize.HasOneSetAssociationMixin<Userinfo, UserinfoId>;
  createUserinfo!: Sequelize.HasOneCreateAssociationMixin<Userinfo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init({
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "user_email_key"
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'yathi',
    timestamps: true,
    indexes: [
      {
        name: "user_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "user_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
