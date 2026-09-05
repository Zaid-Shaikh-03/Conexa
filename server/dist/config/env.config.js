"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
const get_env_1 = require("../utils/get-env");
exports.Env = {
    NODE_ENV: (0, get_env_1.getEnv)("NODE_ENV", "production"),
    PORT: Number((0, get_env_1.getEnv)("PORT", "8000")),
    MONGO_URI: (0, get_env_1.getEnv)("MONGO_URI"),
    JWT_SECRET: (0, get_env_1.getEnv)("JWT_SECRET", "secret_jwt"),
    JWT_EXPIRES_IN: (0, get_env_1.getEnv)("JWT_EXPIRES_IN", "15m"),
    FRONTEND_ORIGIN: (0, get_env_1.getEnv)("FRONTEND_ORIGIN", "http://localhost:5173"),
    CLOUDINARY_CLOUD_NAME: (0, get_env_1.getEnv)("CLOUDINARY_CLOUD_NAME"),
    CLOUDINARY_API_KEY: (0, get_env_1.getEnv)("CLOUDINARY_API_KEY"),
    CLOUDINARY_API_SECRET: (0, get_env_1.getEnv)("CLOUDINARY_API_SECRET"),
    GOOGLE_GENERATIVE_AI_API_KEY: (0, get_env_1.getEnv)("GOOGLE_GENERATIVE_AI_API_KEY"),
};
