import type { Sequelize } from "sequelize";
import { User as _User } from "./user";
import type { UserAttributes, UserCreationAttributes } from "./user";
import { Userinfo as _Userinfo } from "./userinfo";
import type { UserinfoAttributes, UserinfoCreationAttributes } from "./userinfo";

export {
  _User as User,
  _Userinfo as Userinfo,
};

export type {
  UserAttributes,
  UserCreationAttributes,
  UserinfoAttributes,
  UserinfoCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const User = _User.initModel(sequelize);
  const Userinfo = _Userinfo.initModel(sequelize);

  Userinfo.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasOne(Userinfo, { as: "userinfo", foreignKey: "userId"});

  return {
    User: User,
    Userinfo: Userinfo,
  };
}
