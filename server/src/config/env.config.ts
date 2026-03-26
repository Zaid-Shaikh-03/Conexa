import { getEnv } from "../utils/get-env.js";

export const Env = {
    NODE_ENV: getEnv("NODE_ENV","development"),
    PORT: Number(getEnv("PORT", "8000")),
    MONGO_URI: getEnv("MONGO-URI"),
    JWT_SECRET: getEnv("JWT_SECRET","secret_jwt"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN","15m"),
    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN","http://localhost:5173"),
} as const;