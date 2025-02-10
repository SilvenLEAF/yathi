import XDbHelpers from "../../database";
const { Server } = require('socket.io');

const initializeSocketIO = (server: any) => {
  const io = new Server(server, {
    // cors: { origin: '*' }
    cors: {
      origin: 'http://localhost:9000', // Allow frontend to connect from port 9000
      methods: ['GET', 'POST'],
    },
  });

  const { Onlineuser, Blockeduser, Message } = XDbHelpers.getDbModels();

  io.on('connection', (socket: any) => {
    const currentSocketId = socket.id;
    console.log(`@User connected (user socket id): ${currentSocketId}`);

    socket.on('user_online', async (userId: any) => {
      console.log("@userId", userId);
      await Onlineuser.upsert({
        userId: userId,
        socketId: currentSocketId,
      })
    });

    socket.on('send_message', async (data: any) => {
      const { senderId, receiverId, content, messageType, gifFileLocation, voiceNoteFileLocation } = data;

      // check if the sender is blocked
      const isBlocked = await Blockeduser.findOne({ where: { blockedId: receiverId || 0, blockedUserId: senderId || 0 } });
      if (isBlocked) return;

      // save message in DB
      const message = await Message.create({
        senderId: senderId,
        receiverId: receiverId,

        content: content,
        messageType: messageType,
        gifFileLocation: gifFileLocation,
        voiceNoteFileLocation: voiceNoteFileLocation
      });

      // emit message to the receiver
      const onlineReceiver = await Onlineuser.findOne({ where: { userId: receiverId || 0 }, raw: true, nest: true });
      if (onlineReceiver) {
        const onlineReceiverSocketId = onlineReceiver.socketId;
        io.to(onlineReceiverSocketId).emit('receive_message', message); // handle this on UI
      }
    });

    socket.on('mark_as_read', async (messageId: any) => {
      await Message.update({ isRead: true }, { where: { messageId: messageId || 0 } });
      io.emit('message_read', { messageId }); // handle this on UI
    });

    socket.on('disconnect', async () => {
      console.log(`@User disconnected (user socket id): ${currentSocketId}`);
      const onlineUser = await Onlineuser.findOne({ where: { socketId: currentSocketId || 0 }, raw: true, nest: true });

      if (onlineUser) {
        await Onlineuser.destroy({ where: { onlineId: onlineUser.onlineId || 0, socketId: currentSocketId || 0 } });
      }
    });
  });
}

export default initializeSocketIO;