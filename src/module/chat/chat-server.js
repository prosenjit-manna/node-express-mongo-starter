import { Server } from "socket.io";
import Chat from './chat.mongo.js';
import jwt from 'jsonwebtoken';
import { appEnv } from '../../env.js';

export function createChatServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

   // Authentication middleware
   io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization;

    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      // Remove 'Bearer ' if present
      const jwtToken = token.replace('Bearer ', '');
      const decoded = jwt.verify(jwtToken,  appEnv.JSON_WEB_TOKEN_SECRET);
      socket.userId = decoded.userId; // Store userId in socket for later use
      next();
    } catch (error) {
      return next(new Error(error.message));
    }
  });
  
  io.on("connection", (socket) => {
    console.log("a user connected");

    // Join a personal room based on userId
    socket.on("join", () => {
      if (socket.userId === undefined) {
        socket.emit("error", "userId is required");
        return;
      }
      socket.join(socket.userId);
      console.log(`User ${socket.userId} joined their room`);
    });

    socket.on("sendMessage", async (msg) => {
      try {
         const chatMessage = new Chat({
            senderId: socket.userId,
            receiverId: msg.receiverId,
            message: msg.message
          });
          await chatMessage.save();

        io.to(msg.receiverId).emit("message", msg);
      } catch (error) {
        console.log("Error sending message: ", error);
        socket.emit("error", "Failed to send message");
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}
