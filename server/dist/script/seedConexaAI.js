"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConexaAI = void 0;
require("dotenv/config");
const user_model_1 = __importDefault(require("../models/user.model"));
const database_config_1 = __importDefault(require("../config/database.config"));
const CreateConexaAI = async () => {
    const existingAI = await user_model_1.default.findOne({ isAI: true });
    if (existingAI) {
        await user_model_1.default.deleteOne({ _id: existingAI._id });
    }
    const conexaAI = await user_model_1.default.create({
        name: "Conexa AI",
        isAI: true,
        avatar: "https://res.cloudinary.com/dttt1f4un/image/upload/v1788543238/AI_logo_ujewnq.png",
    });
    console.log("Conexa AI created: ", conexaAI._id);
    return conexaAI;
};
exports.CreateConexaAI = CreateConexaAI;
const seedConexaAI = async () => {
    try {
        await (0, database_config_1.default)();
        await (0, exports.CreateConexaAI)();
        console.log("Seeding completed");
        process.exit(0);
    }
    catch (error) {
        console.error("Seeding failed: ", error);
        process.exit(0);
    }
};
seedConexaAI();
