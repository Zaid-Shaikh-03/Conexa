"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = require("../utils/bcrypt");
const userSchema = new mongoose_1.Schema({
    name: { type: String },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: function () {
            return !this.isAI;
        },
    },
    password: {
        type: String,
        required: function () {
            return !this.isAI;
        },
    },
    avatar: {
        type: String,
        default: null,
    },
    isAI: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            if (ret) {
                delete ret.password;
            }
            return ret;
        },
    },
});
userSchema.pre("save", async function (next) {
    if (this.password && this.isModified("password")) {
        this.password = await (0, bcrypt_1.hashValue)(this.password);
    }
    next();
});
userSchema.methods.comparePassword = async function (val) {
    return (0, bcrypt_1.compareValue)(val, this.password);
};
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
