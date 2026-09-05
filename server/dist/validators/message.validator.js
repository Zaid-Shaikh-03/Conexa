"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageSchema = void 0;
const zod_1 = require("zod");
exports.sendMessageSchema = zod_1.z.object({
    chatId: zod_1.z.string().trim().min(1),
    content: zod_1.z.string().trim().optional(),
    image: zod_1.z.string().trim().optional(),
    replyToId: zod_1.z.string().trim().optional()
}).refine((data) => data.content || data.image, {
    message: "Either content or image must be provided",
    path: ["content"]
});
