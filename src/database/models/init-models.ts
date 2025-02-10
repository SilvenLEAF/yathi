import type { Sequelize } from "sequelize";
import { Blockeduser as _Blockeduser } from "./blockeduser";
import type { BlockeduserAttributes, BlockeduserCreationAttributes } from "./blockeduser";
import { Message as _Message } from "./message";
import type { MessageAttributes, MessageCreationAttributes } from "./message";
import { Onlineuser as _Onlineuser } from "./onlineuser";
import type { OnlineuserAttributes, OnlineuserCreationAttributes } from "./onlineuser";
import { Reporteduser as _Reporteduser } from "./reporteduser";
import type { ReporteduserAttributes, ReporteduserCreationAttributes } from "./reporteduser";
import { User as _User } from "./user";
import type { UserAttributes, UserCreationAttributes } from "./user";
import { Userinfo as _Userinfo } from "./userinfo";
import type { UserinfoAttributes, UserinfoCreationAttributes } from "./userinfo";
import { Userlocation as _Userlocation } from "./userlocation";
import type { UserlocationAttributes, UserlocationCreationAttributes } from "./userlocation";

export {
  _Blockeduser as Blockeduser,
  _Message as Message,
  _Onlineuser as Onlineuser,
  _Reporteduser as Reporteduser,
  _User as User,
  _Userinfo as Userinfo,
  _Userlocation as Userlocation,
};

export type {
  BlockeduserAttributes,
  BlockeduserCreationAttributes,
  MessageAttributes,
  MessageCreationAttributes,
  OnlineuserAttributes,
  OnlineuserCreationAttributes,
  ReporteduserAttributes,
  ReporteduserCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  UserinfoAttributes,
  UserinfoCreationAttributes,
  UserlocationAttributes,
  UserlocationCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Blockeduser = _Blockeduser.initModel(sequelize);
  const Message = _Message.initModel(sequelize);
  const Onlineuser = _Onlineuser.initModel(sequelize);
  const Reporteduser = _Reporteduser.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const Userinfo = _Userinfo.initModel(sequelize);
  const Userlocation = _Userlocation.initModel(sequelize);

  Userinfo.belongsTo(User, { as: "user", foreignKey: "userId"});
  User.hasOne(Userinfo, { as: "userinfo", foreignKey: "userId"});
  Blockeduser.belongsTo(Userinfo, { as: "blockedUser", foreignKey: "blockedUserId"});
  Userinfo.hasMany(Blockeduser, { as: "blockedusers", foreignKey: "blockedUserId"});
  Blockeduser.belongsTo(Userinfo, { as: "blocker", foreignKey: "blockerId"});
  Userinfo.hasMany(Blockeduser, { as: "blockerBlockedusers", foreignKey: "blockerId"});
  Blockeduser.belongsTo(Userinfo, { as: "createdByUserinfo", foreignKey: "createdBy"});
  Userinfo.hasMany(Blockeduser, { as: "createdByBlockedusers", foreignKey: "createdBy"});
  Blockeduser.belongsTo(Userinfo, { as: "updatedByUserinfo", foreignKey: "updatedBy"});
  Userinfo.hasMany(Blockeduser, { as: "updatedByBlockedusers", foreignKey: "updatedBy"});
  Message.belongsTo(Userinfo, { as: "createdByUserinfo", foreignKey: "createdBy"});
  Userinfo.hasMany(Message, { as: "messages", foreignKey: "createdBy"});
  Message.belongsTo(Userinfo, { as: "receiver", foreignKey: "receiverId"});
  Userinfo.hasMany(Message, { as: "receiverMessages", foreignKey: "receiverId"});
  Message.belongsTo(Userinfo, { as: "sender", foreignKey: "senderId"});
  Userinfo.hasMany(Message, { as: "senderMessages", foreignKey: "senderId"});
  Message.belongsTo(Userinfo, { as: "updatedByUserinfo", foreignKey: "updatedBy"});
  Userinfo.hasMany(Message, { as: "updatedByMessages", foreignKey: "updatedBy"});
  Onlineuser.belongsTo(Userinfo, { as: "user", foreignKey: "userId"});
  Userinfo.hasOne(Onlineuser, { as: "onlineuser", foreignKey: "userId"});
  Reporteduser.belongsTo(Userinfo, { as: "createdByUserinfo", foreignKey: "createdBy"});
  Userinfo.hasMany(Reporteduser, { as: "reportedusers", foreignKey: "createdBy"});
  Reporteduser.belongsTo(Userinfo, { as: "reportedUser", foreignKey: "reportedUserId"});
  Userinfo.hasMany(Reporteduser, { as: "reportedUserReportedusers", foreignKey: "reportedUserId"});
  Reporteduser.belongsTo(Userinfo, { as: "reporter", foreignKey: "reporterId"});
  Userinfo.hasMany(Reporteduser, { as: "reporterReportedusers", foreignKey: "reporterId"});
  Reporteduser.belongsTo(Userinfo, { as: "updatedByUserinfo", foreignKey: "updatedBy"});
  Userinfo.hasMany(Reporteduser, { as: "updatedByReportedusers", foreignKey: "updatedBy"});
  Userlocation.belongsTo(Userinfo, { as: "user", foreignKey: "userId"});
  Userinfo.hasOne(Userlocation, { as: "userlocation", foreignKey: "userId"});

  return {
    Blockeduser: Blockeduser,
    Message: Message,
    Onlineuser: Onlineuser,
    Reporteduser: Reporteduser,
    User: User,
    Userinfo: Userinfo,
    Userlocation: Userlocation,
  };
}
