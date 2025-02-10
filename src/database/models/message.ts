import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Userinfo, UserinfoId } from './userinfo';

export interface MessageAttributes {
  messageId: number;
  messageUuid: string;
  senderId: number;
  receiverId: number;
  messageType: string;
  content?: string;
  gifFileLocation?: string;
  voiceNoteFileLocation?: string;
  isRead?: boolean;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MessagePk = "messageId";
export type MessageId = Message[MessagePk];
export type MessageOptionalAttributes = "messageId" | "messageUuid" | "content" | "gifFileLocation" | "voiceNoteFileLocation" | "isRead" | "createdBy" | "updatedBy" | "createdAt" | "updatedAt";
export type MessageCreationAttributes = Optional<MessageAttributes, MessageOptionalAttributes>;

export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  messageId!: number;
  messageUuid!: string;
  senderId!: number;
  receiverId!: number;
  messageType!: string;
  content?: string;
  gifFileLocation?: string;
  voiceNoteFileLocation?: string;
  isRead?: boolean;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
  updatedAt?: Date;

  // Message belongsTo Userinfo via createdBy
  createdByUserinfo!: Userinfo;
  getCreatedByUserinfo!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setCreatedByUserinfo!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createCreatedByUserinfo!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;
  // Message belongsTo Userinfo via receiverId
  receiver!: Userinfo;
  getReceiver!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setReceiver!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createReceiver!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;
  // Message belongsTo Userinfo via senderId
  sender!: Userinfo;
  getSender!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setSender!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createSender!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;
  // Message belongsTo Userinfo via updatedBy
  updatedByUserinfo!: Userinfo;
  getUpdatedByUserinfo!: Sequelize.BelongsToGetAssociationMixin<Userinfo>;
  setUpdatedByUserinfo!: Sequelize.BelongsToSetAssociationMixin<Userinfo, UserinfoId>;
  createUpdatedByUserinfo!: Sequelize.BelongsToCreateAssociationMixin<Userinfo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Message {
    return Message.init({
    messageId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'message_id'
    },
    messageUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: 'message_uuid'
    },
    senderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'userinfo',
        key: 'user_id'
      },
      field: 'sender_id'
    },
    receiverId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'userinfo',
        key: 'user_id'
      },
      field: 'receiver_id'
    },
    messageType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'message_type'
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gifFileLocation: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'gif_file_location'
    },
    voiceNoteFileLocation: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'voice_note_file_location'
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_read'
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
    tableName: 'message',
    schema: 'yathi',
    timestamps: false,
    indexes: [
      {
        name: "message_pkey",
        unique: true,
        fields: [
          { name: "message_id" },
        ]
      },
    ]
  });
  }
}
