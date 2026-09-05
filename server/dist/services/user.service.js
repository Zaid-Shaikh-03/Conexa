"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersService = exports.findByIdUserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const findByIdUserService = async (userId) => {
    return await user_model_1.default.findById(userId);
};
exports.findByIdUserService = findByIdUserService;
const getUsersService = async (userId) => {
    const users = await user_model_1.default.find({
        _id: { $ne: userId }
    }).select('-password');
    return users;
};
exports.getUsersService = getUsersService;
