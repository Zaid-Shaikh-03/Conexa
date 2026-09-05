"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.registerService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const app_error_1 = require("../utils/app-error");
const registerService = async (body) => {
    const { email } = body;
    const existingUser = await user_model_1.default.findOne({ email });
    if (existingUser)
        throw new app_error_1.UnauthorizedException("User email already exist");
    const newUser = new user_model_1.default({
        name: body.name,
        email: body.email,
        password: body.password,
        avatar: body.avatar,
    });
    await newUser.save();
    return newUser;
};
exports.registerService = registerService;
const loginService = async (body) => {
    const { email, password } = body;
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        throw new app_error_1.NotFoundException("Email or Password not found ");
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
        throw new app_error_1.UnauthorizedException("Invalid email or passwor");
    return user;
};
exports.loginService = loginService;
