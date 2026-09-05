"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearJwtAuthCookie = exports.setJwtAuthCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
const setJwtAuthCookie = ({ res, userId }) => {
    const payload = { userId };
    const expiresIn = env_config_1.Env.JWT_EXPIRES_IN;
    const token = jsonwebtoken_1.default.sign(payload, env_config_1.Env.JWT_SECRET, {
        audience: ["user"],
        expiresIn: expiresIn || "7d"
    });
    return res.cookie('accessToken', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: env_config_1.Env.NODE_ENV === "production" ? true : false,
        sameSite: env_config_1.Env.NODE_ENV === "production" ? "strict" : "lax"
    });
};
exports.setJwtAuthCookie = setJwtAuthCookie;
const clearJwtAuthCookie = (res) => {
    return res.clearCookie("accessToken", { path: "/" });
};
exports.clearJwtAuthCookie = clearJwtAuthCookie;
