"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareValue = exports.hashValue = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashValue = async (value, salt = 10) => {
    return await bcryptjs_1.default.hash(value, salt);
};
exports.hashValue = hashValue;
const compareValue = async (value, hashValue) => {
    return await bcryptjs_1.default.compare(value, hashValue);
};
exports.compareValue = compareValue;
