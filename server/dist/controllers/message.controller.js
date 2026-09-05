"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageController = void 0;
const asyncHandler_middleware_1 = require("../middlewares/asyncHandler.middleware");
const message_validator_1 = require("../validators/message.validator");
const http_config_1 = require("../config/http.config");
const message_service_1 = require("../services/message.service");
exports.sendMessageController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const body = message_validator_1.sendMessageSchema.parse(req.body);
    const result = await (0, message_service_1.sendMessageService)(userId, body);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Message sent successfully",
        ...result,
    });
});
