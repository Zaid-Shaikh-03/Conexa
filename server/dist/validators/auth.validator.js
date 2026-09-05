"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = exports.passwordSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z.string().trim().email("Invalid email address").min(1);
exports.passwordSchema = zod_1.z.string().trim().min(1);
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1),
    email: exports.emailSchema,
    password: exports.passwordSchema,
    avatar: zod_1.z.string().optional()
});
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: exports.passwordSchema
});
