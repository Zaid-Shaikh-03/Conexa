"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageService = void 0;
const google_1 = require("@ai-sdk/google");
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const chat_model_1 = __importDefault(require("../models/chat.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
const app_error_1 = require("../utils/app-error");
const socket_1 = require("../lib/socket");
const env_config_1 = require("../config/env.config");
const user_model_1 = __importDefault(require("../models/user.model"));
const ai_1 = require("ai");
const google = (0, google_1.createGoogleGenerativeAI)({
    apiKey: env_config_1.Env.GOOGLE_GENERATIVE_AI_API_KEY,
});
const sendMessageService = async (userId, body) => {
    const { chatId, content, image, replyToId } = body;
    const chat = await chat_model_1.default.findOne({
        _id: chatId,
        participants: {
            $in: [userId],
        },
    });
    if (!chat)
        throw new app_error_1.BadRequestException("chat not found or authorized");
    if (replyToId) {
        const replyMessage = await message_model_1.default.findOne({
            _id: replyToId,
            chatId,
        });
        if (!replyMessage)
            throw new app_error_1.NotFoundException("Reply message not found");
    }
    let imageUrl;
    if (image) {
        const uploadRes = await cloudinary_config_1.default.uploader.upload(image);
        imageUrl = uploadRes.secure_url;
    }
    const newMessage = await message_model_1.default.create({
        chatId,
        sender: userId,
        content,
        image,
        replyTo: replyToId || null,
    });
    await newMessage.populate([
        { path: "sender", select: "name avatar" },
        {
            path: "replyTo",
            select: "content image sender",
            populate: {
                path: "sender",
                select: "name avatar",
            },
        },
    ]);
    chat.lastMessage = newMessage._id;
    await chat.save();
    //websocket emit the new message to the chat room
    (0, socket_1.emitNewMessageToChatRoom)(userId, chatId, newMessage);
    //websocket emit the lastmessage to members (personal room user)
    const allParticipantIds = chat.participants.map((id) => id.toString());
    (0, socket_1.emitLastMessageToParticipants)(allParticipantIds, chatId, newMessage);
    let aiResponse = null;
    if (chat.isAiChat) {
        aiResponse = await getAIResponse(chatId, userId);
        if (aiResponse) {
            chat.lastMessage = aiResponse._id;
            await chat.save();
        }
    }
    return { userMessage: newMessage, chat, aiResponse };
};
exports.sendMessageService = sendMessageService;
async function getAIResponse(chatId, userId) {
    const conexaAI = await user_model_1.default.findOne({ isAI: true });
    if (!conexaAI)
        throw new app_error_1.NotFoundException("AI user not found");
    const chatHistory = await getChatHistory(chatId);
    const formatedMessages = chatHistory.map((msg) => {
        const role = msg.sender.isAI ? "assistant" : "user";
        const parts = [];
        if (msg.image) {
            parts.push({
                type: "file",
                data: msg.image,
                mediaType: "image/png",
                filename: "image.png",
            });
            if (!msg.content) {
                parts.push({
                    type: "text",
                    text: "Describe what you see in the image",
                });
            }
        }
        if (msg.content) {
            parts.push({
                type: "text",
                text: msg.replyTo
                    ? `[Replying to: "${msg.replyTo.content}"]\n${msg.content}`
                    : msg.content,
            });
        }
        return { role, content: parts };
    });
    const result = await (0, ai_1.streamText)({
        model: google("gemini-3.6-flash"),
        messages: formatedMessages,
        system: "You are Conexa AI, a helpful and friendly assistant. Respond only which text and attend to the last user message only.",
    });
    let fullResponse = "";
    for await (const chunk of result.textStream) {
        (0, socket_1.emitChatAI)({
            chatId,
            chunk,
            sender: conexaAI,
            done: false,
            message: null,
        });
        fullResponse += chunk;
    }
    if (!fullResponse.trim())
        return "";
    const aiMessage = await message_model_1.default.create({
        chatId,
        sender: conexaAI._id,
        content: fullResponse,
    });
    await aiMessage.populate("sender", "name avatar isAI");
    (0, socket_1.emitChatAI)({
        chatId,
        chunk: null,
        sender: conexaAI,
        done: true,
        message: aiMessage,
    });
    (0, socket_1.emitLastMessageToParticipants)([userId], chatId, aiMessage);
    return aiMessage;
}
async function getChatHistory(chatId) {
    const messages = await message_model_1.default.find({ chatId })
        .populate("sender", "isAI")
        .populate("replyTo", "content")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();
    return messages.reverse();
}
