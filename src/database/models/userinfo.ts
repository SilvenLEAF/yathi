import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Blockeduser, BlockeduserId } from './blockeduser';
import type { Message, MessageId } from './message';
import type { Onlineuser, OnlineuserCreationAttributes, OnlineuserId } from './onlineuser';
import type { Reporteduser, ReporteduserId } from './reporteduser';
import type { User, UserId } from './user';
import type { Userlocation, UserlocationCreationAttributes, UserlocationId } from './userlocation';

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
  twitterHandle?: string;
  dateOfBirth?: string;
  isVisible: boolean;
}

export type UserinfoPk = "userId";
export type UserinfoId = Userinfo[UserinfoPk];
export type UserinfoOptionalAttributes = "userUuid" | "firstname" | "lastname" | "picture" | "age" | "gender" | "occupation" | "zodiac" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt" | "twitterHandle" | "dateOfBirth";
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
  twitterHandle?: string;
  dateOfBirth?: string;
  isVisible!: boolean;

  // Userinfo belongsTo User via userId
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;
  // Userinfo hasMany Blockeduser via blockedUserId
  blockedusers!: Blockeduser[];
  getBlockedusers!: Sequelize.HasManyGetAssociationsMixin<Blockeduser>;
  setBlockedusers!: Sequelize.HasManySetAssociationsMixin<Blockeduser, BlockeduserId>;
  addBlockeduser!: Sequelize.HasManyAddAssociationMixin<Blockeduser, BlockeduserId>;
  addBlockedusers!: Sequelize.HasManyAddAssociationsMixin<Blockeduser, BlockeduserId>;
  createBlockeduser!: Sequelize.HasManyCreateAssociationMixin<Blockeduser>;
  removeBlockeduser!: Sequelize.HasManyRemoveAssociationMixin<Blockeduser, BlockeduserId>;
  removeBlockedusers!: Sequelize.HasManyRemoveAssociationsMixin<Blockeduser, BlockeduserId>;
  hasBlockeduser!: Sequelize.HasManyHasAssociationMixin<Blockeduser, BlockeduserId>;
  hasBlockedusers!: Sequelize.HasManyHasAssociationsMixin<Blockeduser, BlockeduserId>;
  countBlockedusers!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasMany Blockeduser via blockerId
  blockerBlockedusers!: Blockeduser[];
  getBlockerBlockedusers!: Sequelize.HasManyGetAssociationsMixin<Blockeduser>;
  setBlockerBlockedusers!: Sequelize.HasManySetAssociationsMixin<Blockeduser, BlockeduserId>;
  addBlockerBlockeduser!: Sequelize.HasManyAddAssociationMixin<Blockeduser, BlockeduserId>;
  addBlockerBlockedusers!: Sequelize.HasManyAddAssociationsMixin<Blockeduser, BlockeduserId>;
  createBlockerBlockeduser!: Sequelize.HasManyCreateAssociationMixin<Blockeduser>;
  removeBlockerBlockeduser!: Sequelize.HasManyRemoveAssociationMixin<Blockeduser, BlockeduserId>;
  removeBlockerBlockedusers!: Sequelize.HasManyRemoveAssociationsMixin<Blockeduser, BlockeduserId>;
  hasBlockerBlockeduser!: Sequelize.HasManyHasAssociationMixin<Blockeduser, BlockeduserId>;
  hasBlockerBlockedusers!: Sequelize.HasManyHasAssociationsMixin<Blockeduser, BlockeduserId>;
  countBlockerBlockedusers!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasMany Blockeduser via createdBy
  createdByBlockedusers!: Blockeduser[];
  getCreatedByBlockedusers!: Sequelize.HasManyGetAssociationsMixin<Blockeduser>;
  setCreatedByBlockedusers!: Sequelize.HasManySetAssociationsMixin<Blockeduser, BlockeduserId>;
  addCreatedByBlockeduser!: Sequelize.HasManyAddAssociationMixin<Blockeduser, BlockeduserId>;
  addCreatedByBlockedusers!: Sequelize.HasManyAddAssociationsMixin<Blockeduser, BlockeduserId>;
  createCreatedByBlockeduser!: Sequelize.HasManyCreateAssociationMixin<Blockeduser>;
  removeCreatedByBlockeduser!: Sequelize.HasManyRemoveAssociationMixin<Blockeduser, BlockeduserId>;
  removeCreatedByBlockedusers!: Sequelize.HasManyRemoveAssociationsMixin<Blockeduser, BlockeduserId>;
  hasCreatedByBlockeduser!: Sequelize.HasManyHasAssociationMixin<Blockeduser, BlockeduserId>;
  hasCreatedByBlockedusers!: Sequelize.HasManyHasAssociationsMixin<Blockeduser, BlockeduserId>;
  countCreatedByBlockedusers!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasMany Blockeduser via updatedBy
  updatedByBlockedusers!: Blockeduser[];
  getUpdatedByBlockedusers!: Sequelize.HasManyGetAssociationsMixin<Blockeduser>;
  setUpdatedByBlockedusers!: Sequelize.HasManySetAssociationsMixin<Blockeduser, BlockeduserId>;
  addUpdatedByBlockeduser!: Sequelize.HasManyAddAssociationMixin<Blockeduser, BlockeduserId>;
  addUpdatedByBlockedusers!: Sequelize.HasManyAddAssociationsMixin<Blockeduser, BlockeduserId>;
  createUpdatedByBlockeduser!: Sequelize.HasManyCreateAssociationMixin<Blockeduser>;
  removeUpdatedByBlockeduser!: Sequelize.HasManyRemoveAssociationMixin<Blockeduser, BlockeduserId>;
  removeUpdatedByBlockedusers!: Sequelize.HasManyRemoveAssociationsMixin<Blockeduser, BlockeduserId>;
  hasUpdatedByBlockeduser!: Sequelize.HasManyHasAssociationMixin<Blockeduser, BlockeduserId>;
  hasUpdatedByBlockedusers!: Sequelize.HasManyHasAssociationsMixin<Blockeduser, BlockeduserId>;
  countUpdatedByBlockedusers!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasMany Message via createdBy
  messages!: Message[];
  getMessages!: Sequelize.HasManyGetAssociationsMixin<Message>;
  setMessages!: Sequelize.HasManySetAssociationsMixin<Message, MessageId>;
  addMessage!: Sequelize.HasManyAddAssociationMixin<Message, MessageId>;
  addMessages!: Sequelize.HasManyAddAssociationsMixin<Message, MessageId>;
  createMessage!: Sequelize.HasManyCreateAssociationMixin<Message>;
  removeMessage!: Sequelize.HasManyRemoveAssociationMixin<Message, MessageId>;
  removeMessages!: Sequelize.HasManyRemoveAssociationsMixin<Message, MessageId>;
  hasMessage!: Sequelize.HasManyHasAssociationMixin<Message, MessageId>;
  hasMessages!: Sequelize.HasManyHasAssociationsMixin<Message, MessageId>;
  countMessages!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasMany Message via receiverId
  receiverMessages!: Message[];
  getReceiverMessages!: Sequelize.HasManyGetAssociationsMixin<Message>;
  setReceiverMessages!: Sequelize.HasManySetAssociationsMixin<Message, MessageId>;
  addReceiverMessage!: Sequelize.HasManyAddAssociationMixin<Message, MessageId>;
  addReceiverMessages!: Sequelize.HasManyAddAssociationsMixin<Message, MessageId>;
  createReceiverMessage!: Sequelize.HasManyCreateAssociationMixin<Message>;
  removeReceiverMessage!: Sequelize.HasManyRemoveAssociationMixin<Message, MessageId>;
  removeReceiverMessages!: Sequelize.HasManyRemoveAssociationsMixin<Message, MessageId>;
  hasReceiverMessage!: Sequelize.HasManyHasAssociationMixin<Message, MessageId>;
  hasReceiverMessages!: Sequelize.HasManyHasAssociationsMixin<Message, MessageId>;
  countReceiverMessages!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasMany Message via senderId
  senderMessages!: Message[];
  getSenderMessages!: Sequelize.HasManyGetAssociationsMixin<Message>;
  setSenderMessages!: Sequelize.HasManySetAssociationsMixin<Message, MessageId>;
  addSenderMessage!: Sequelize.HasManyAddAssociationMixin<Message, MessageId>;
  addSenderMessages!: Sequelize.HasManyAddAssociationsMixin<Message, MessageId>;
  createSenderMessage!: Sequelize.HasManyCreateAssociationMixin<Message>;
  removeSenderMessage!: Sequelize.HasManyRemoveAssociationMixin<Message, MessageId>;
  removeSenderMessages!: Sequelize.HasManyRemoveAssociationsMixin<Message, MessageId>;
  hasSenderMessage!: Sequelize.HasManyHasAssociationMixin<Message, MessageId>;
  hasSenderMessages!: Sequelize.HasManyHasAssociationsMixin<Message, MessageId>;
  countSenderMessages!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasMany Message via updatedBy
  updatedByMessages!: Message[];
  getUpdatedByMessages!: Sequelize.HasManyGetAssociationsMixin<Message>;
  setUpdatedByMessages!: Sequelize.HasManySetAssociationsMixin<Message, MessageId>;
  addUpdatedByMessage!: Sequelize.HasManyAddAssociationMixin<Message, MessageId>;
  addUpdatedByMessages!: Sequelize.HasManyAddAssociationsMixin<Message, MessageId>;
  createUpdatedByMessage!: Sequelize.HasManyCreateAssociationMixin<Message>;
  removeUpdatedByMessage!: Sequelize.HasManyRemoveAssociationMixin<Message, MessageId>;
  removeUpdatedByMessages!: Sequelize.HasManyRemoveAssociationsMixin<Message, MessageId>;
  hasUpdatedByMessage!: Sequelize.HasManyHasAssociationMixin<Message, MessageId>;
  hasUpdatedByMessages!: Sequelize.HasManyHasAssociationsMixin<Message, MessageId>;
  countUpdatedByMessages!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasOne Onlineuser via userId
  onlineuser!: Onlineuser;
  getOnlineuser!: Sequelize.HasOneGetAssociationMixin<Onlineuser>;
  setOnlineuser!: Sequelize.HasOneSetAssociationMixin<Onlineuser, OnlineuserId>;
  createOnlineuser!: Sequelize.HasOneCreateAssociationMixin<Onlineuser>;
  // Userinfo hasMany Reporteduser via createdBy
  reportedusers!: Reporteduser[];
  getReportedusers!: Sequelize.HasManyGetAssociationsMixin<Reporteduser>;
  setReportedusers!: Sequelize.HasManySetAssociationsMixin<Reporteduser, ReporteduserId>;
  addReporteduser!: Sequelize.HasManyAddAssociationMixin<Reporteduser, ReporteduserId>;
  addReportedusers!: Sequelize.HasManyAddAssociationsMixin<Reporteduser, ReporteduserId>;
  createReporteduser!: Sequelize.HasManyCreateAssociationMixin<Reporteduser>;
  removeReporteduser!: Sequelize.HasManyRemoveAssociationMixin<Reporteduser, ReporteduserId>;
  removeReportedusers!: Sequelize.HasManyRemoveAssociationsMixin<Reporteduser, ReporteduserId>;
  hasReporteduser!: Sequelize.HasManyHasAssociationMixin<Reporteduser, ReporteduserId>;
  hasReportedusers!: Sequelize.HasManyHasAssociationsMixin<Reporteduser, ReporteduserId>;
  countReportedusers!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasMany Reporteduser via reportedUserId
  reportedUserReportedusers!: Reporteduser[];
  getReportedUserReportedusers!: Sequelize.HasManyGetAssociationsMixin<Reporteduser>;
  setReportedUserReportedusers!: Sequelize.HasManySetAssociationsMixin<Reporteduser, ReporteduserId>;
  addReportedUserReporteduser!: Sequelize.HasManyAddAssociationMixin<Reporteduser, ReporteduserId>;
  addReportedUserReportedusers!: Sequelize.HasManyAddAssociationsMixin<Reporteduser, ReporteduserId>;
  createReportedUserReporteduser!: Sequelize.HasManyCreateAssociationMixin<Reporteduser>;
  removeReportedUserReporteduser!: Sequelize.HasManyRemoveAssociationMixin<Reporteduser, ReporteduserId>;
  removeReportedUserReportedusers!: Sequelize.HasManyRemoveAssociationsMixin<Reporteduser, ReporteduserId>;
  hasReportedUserReporteduser!: Sequelize.HasManyHasAssociationMixin<Reporteduser, ReporteduserId>;
  hasReportedUserReportedusers!: Sequelize.HasManyHasAssociationsMixin<Reporteduser, ReporteduserId>;
  countReportedUserReportedusers!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasMany Reporteduser via reporterId
  reporterReportedusers!: Reporteduser[];
  getReporterReportedusers!: Sequelize.HasManyGetAssociationsMixin<Reporteduser>;
  setReporterReportedusers!: Sequelize.HasManySetAssociationsMixin<Reporteduser, ReporteduserId>;
  addReporterReporteduser!: Sequelize.HasManyAddAssociationMixin<Reporteduser, ReporteduserId>;
  addReporterReportedusers!: Sequelize.HasManyAddAssociationsMixin<Reporteduser, ReporteduserId>;
  createReporterReporteduser!: Sequelize.HasManyCreateAssociationMixin<Reporteduser>;
  removeReporterReporteduser!: Sequelize.HasManyRemoveAssociationMixin<Reporteduser, ReporteduserId>;
  removeReporterReportedusers!: Sequelize.HasManyRemoveAssociationsMixin<Reporteduser, ReporteduserId>;
  hasReporterReporteduser!: Sequelize.HasManyHasAssociationMixin<Reporteduser, ReporteduserId>;
  hasReporterReportedusers!: Sequelize.HasManyHasAssociationsMixin<Reporteduser, ReporteduserId>;
  countReporterReportedusers!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasMany Reporteduser via updatedBy
  updatedByReportedusers!: Reporteduser[];
  getUpdatedByReportedusers!: Sequelize.HasManyGetAssociationsMixin<Reporteduser>;
  setUpdatedByReportedusers!: Sequelize.HasManySetAssociationsMixin<Reporteduser, ReporteduserId>;
  addUpdatedByReporteduser!: Sequelize.HasManyAddAssociationMixin<Reporteduser, ReporteduserId>;
  addUpdatedByReportedusers!: Sequelize.HasManyAddAssociationsMixin<Reporteduser, ReporteduserId>;
  createUpdatedByReporteduser!: Sequelize.HasManyCreateAssociationMixin<Reporteduser>;
  removeUpdatedByReporteduser!: Sequelize.HasManyRemoveAssociationMixin<Reporteduser, ReporteduserId>;
  removeUpdatedByReportedusers!: Sequelize.HasManyRemoveAssociationsMixin<Reporteduser, ReporteduserId>;
  hasUpdatedByReporteduser!: Sequelize.HasManyHasAssociationMixin<Reporteduser, ReporteduserId>;
  hasUpdatedByReportedusers!: Sequelize.HasManyHasAssociationsMixin<Reporteduser, ReporteduserId>;
  countUpdatedByReportedusers!: Sequelize.HasManyCountAssociationsMixin;
  // Userinfo hasOne Userlocation via userId
  userlocation!: Userlocation;
  getUserlocation!: Sequelize.HasOneGetAssociationMixin<Userlocation>;
  setUserlocation!: Sequelize.HasOneSetAssociationMixin<Userlocation, UserlocationId>;
  createUserlocation!: Sequelize.HasOneCreateAssociationMixin<Userlocation>;

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
    },
    twitterHandle: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'twitter_handle'
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'date_of_birth'
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_visible'
    }
  }, {
    sequelize,
    tableName: 'userinfo',
    schema: 'yathi',
    timestamps: false,
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
