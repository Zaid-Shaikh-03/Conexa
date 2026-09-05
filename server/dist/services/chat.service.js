"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChatParticipant = exports.getSingleChatService = exports.getUserChatsService = exports.createChatService = void 0;
const socket_1 = require("../lib/socket");
const chat_model_1 = __importDefault(require("../models/chat.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const app_error_1 = require("../utils/app-error");
const createChatService = async (userId, body) => {
    const { isGroup, groupName, participants, participantId } = body;
    let chat;
    let allParticipantIds = [];
    if (isGroup && participants?.length && groupName) {
        allParticipantIds = [userId, ...participants];
        chat = await chat_model_1.default.create({
            participants: allParticipantIds,
            isGroup: true,
            groupName,
            createdBy: userId,
        });
    }
    else if (participantId) {
        const otherUser = await user_model_1.default.findById(participantId);
        if (!otherUser)
            throw new app_error_1.NotFoundException("User not found");
        allParticipantIds = [userId, participantId];
        const existingChat = await chat_model_1.default.findOne({
            participants: {
                $all: allParticipantIds,
                $size: 2,
            },
        }).populate("participants", "name avatar isAI");
        if (existingChat)
            return existingChat;
        chat = await chat_model_1.default.create({
            participants: allParticipantIds,
            isGroup: false,
            createdBy: userId,
        });
    }
    if (!chat)
        throw new app_error_1.BadRequestException("Chat not created");
    const populateChat = await chat?.populate("participants", "name avatar isAI");
    const participantIdStrings = populateChat?.participants?.map((p) => {
        return p._id?.toString();
    });
    (0, socket_1.emitNewChatToParticipants)(participantIdStrings, populateChat);
    return chat;
};
exports.createChatService = createChatService;
const getUserChatsService = async (userId) => {
    const chats = await chat_model_1.default.find({
        participants: {
            $in: [userId],
        },
    })
        .populate("participants", "name avatar isAI")
        .populate({
        path: "lastMessage",
        populate: {
            path: "sender",
            select: "name avatar",
        },
    })
        .sort({ updatedAt: -1 });
    return chats;
};
exports.getUserChatsService = getUserChatsService;
const getSingleChatService = async (userId, chatId) => {
    const chat = await chat_model_1.default.findOne({
        _id: chatId,
        participants: {
            $in: [userId],
        },
    }).populate("participants", "name avatar isAI");
    if (!chat)
        throw new app_error_1.BadRequestException("Chat not found or you are not authorized to view this chat");
    const messages = await message_model_1.default.find({ chatId })
        .populate("sender", "name avatar isAI")
        .populate({
        path: "replyTo",
        select: "content image sender",
        populate: {
            path: "sender",
            select: "name avatar isAI",
        },
    })
        .sort({ createdAt: 1 });
    return { chat, messages };
};
exports.getSingleChatService = getSingleChatService;
const validateChatParticipant = async (chatId, userId) => {
    const chat = await chat_model_1.default.findOne({
        _id: chatId,
        participants: {
            $in: [userId],
        },
    });
    if (!chat)
        throw new app_error_1.BadRequestException("User not a participant in chat");
};
exports.validateChatParticipant = validateChatParticipant;
