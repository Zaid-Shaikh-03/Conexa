"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatIdSchema = exports.createChatSchema = void 0;
const zod_1 = require("zod");
exports.createChatSchema = zod_1.z.object({
    participantId: zod_1.z.string().trim().min(1).optional(),
    isGroup: zod_1.z.boolean().optional(),
    participants: zod_1.z.array(zod_1.z.string().trim().min(1)).optional(),
    groupName: zod_1.z.string().trim().min(1).optional()
});
exports.chatIdSchema = zod_1.z.object({
    id: zod_1.z.string().trim().min(1),
});
