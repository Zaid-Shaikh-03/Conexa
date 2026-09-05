"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const getEnv = (key, defaultValue = "") => {
    const val = process.env[key] ?? defaultValue;
    if (!val)
        throw new Error("Missing env variable: " + key);
    return val;
};
exports.getEnv = getEnv;
