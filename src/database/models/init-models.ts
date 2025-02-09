import type { Sequelize } from "sequelize";
import { User as _User } from "./user";
import type { UserAttributes, UserCreationAttributes } from "./user";
import { Userinfo as _Userinfo } from "./userinfo";
import type { UserinfoAttributes, UserinfoCreationAttributes } from "./userinfo";
import { Userlocation as _Userlocation } from "./userlocation";
import type { UserlocationAttributes, UserlocationCreationAttributes } from "./userlocation";

export {
  _User as User,
  _Userinfo as Userinfo,
  _Userlocation as Userlocation,
};

export type {
  UserAttributes,
  UserCreationAttributes,
  UserinfoAttributes,
  UserinfoCreationAttributes,
  UserlocationAttributes,
  UserlocationCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const User = _User.initModel(sequelize);
  const Userinfo = _Userinfo.initModel(sequelize);
  const Userlocation = _Userlocation.initModel(sequelize);

  Userinfo.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasOne(Userinfo, { as: "userinfo", foreignKey: "userId"});
  Userlocation.belongsTo(Userinfo, { as: "user", foreignKey: "userId"});
  Userinfo.hasOne(Userlocation, { as: "userlocation", foreignKey: "userId"});

  return {
    User: User,
    Userinfo: Userinfo,
    Userlocation: Userlocation,
  };
}
