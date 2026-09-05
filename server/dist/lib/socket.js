"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitChatAI = exports.emitLastMessageToParticipants = exports.emitNewMessageToChatRoom = exports.emitNewChatToParticipants = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const chat_service_1 = require("../services/chat.service");
let io = null;
const onlineUsers = new Map();
const initializeSocket = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: env_config_1.Env.FRONTEND_ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.use(async (socket, next) => {
        try {
            const rawCookie = socket.handshake.headers.cookie;
            if (!rawCookie)
                return next(new Error("Unauthorized"));
            const token = rawCookie?.split("=")?.[1]?.trim();
            if (!token)
                return next(new Error("Unauthorized"));
            const decodedToken = jsonwebtoken_1.default.verify(token, env_config_1.Env.JWT_SECRET);
            if (!decodedToken)
                return next(new Error("Unauthorized"));
            socket.userId = decodedToken.userId;
            next();
        }
        catch (error) {
            next(new Error("Internal server error"));
        }
    });
    io.on("connection", (socket) => {
        if (!socket.userId) {
            socket.disconnect(true);
            return;
        }
        const userId = socket.userId;
        const newSocketId = socket.id;
        console.log("socket connected", { userId, newSocketId });
        //regoster socket for the user
        onlineUsers.set(userId, newSocketId);
        //broadCast online users to all socket
        io?.emit("online:users", Array.from(onlineUsers.keys()));
        //created personal room for user
        socket.join(`user:${userId}`);
        socket.on(`chat:join`, async (chatId, callback) => {
            try {
                await (0, chat_service_1.validateChatParticipant)(chatId, userId);
                socket.join(`chat:${chatId}`);
                callback?.();
            }
            catch (error) {
                callback?.("Erro joining chat");
            }
        });
        socket.on("chat:leave", (chatId) => {
            if (chatId) {
                socket.leave(`chat:${chatId}`);
                console.log(`User ${userId} left room chat:${chatId}`);
            }
        });
        socket.on("disconnet", () => {
            if (onlineUsers.get(userId) === newSocketId) {
                if (userId)
                    onlineUsers.delete(userId);
                io?.emit("online:users", Array.from(onlineUsers.keys()));
                console.log("socket disconneted", {
                    userId,
                    newSocketId,
                });
            }
        });
    });
};
exports.initializeSocket = initializeSocket;
function getIO() {
    if (!io)
        throw new Error("Socket.IO not initialized");
    return io;
}
const emitNewChatToParticipants = (participantIds = [], chat) => {
    const io = getIO();
    for (const participantId of participantIds) {
        io.to(`user:${participantId}`).emit("chat:new", chat);
    }
};
exports.emitNewChatToParticipants = emitNewChatToParticipants;
const emitNewMessageToChatRoom = (senderId, //userId that send the message
chatId, message) => {
    const io = getIO();
    const senderSocketId = onlineUsers.get(senderId?.toString());
    if (senderSocketId) {
        io.to(`chat:${chatId}`).except(senderSocketId).emit("message:new", message);
    }
    else {
        io.to(`chat:${chatId}`).emit("message:new", message);
    }
};
exports.emitNewMessageToChatRoom = emitNewMessageToChatRoom;
const emitLastMessageToParticipants = (participantIds, chatId, lastMessage) => {
    const io = getIO();
    const payload = { chatId, lastMessage };
    for (const participantId of participantIds) {
        io.to(`user:${participantId}`).emit("chat:update", payload);
    }
};
exports.emitLastMessageToParticipants = emitLastMessageToParticipants;
const emitChatAI = ({ chatId, chunk = null, sender, done = false, message = null, }) => {
    const io = getIO();
    if (chunk?.trim() && !done) {
        io.to(`chat:${chatId}`).emit("chat:ai", {
            chatId,
            chunk,
            done,
            message: null,
            sender,
        });
        return;
    }
    if (done) {
        io.to(`chat:${chatId}`).emit("chat:ai", {
            chatId,
            chunk: null,
            done,
            message,
            sender,
        });
        return;
    }
};
exports.emitChatAI = emitChatAI;
