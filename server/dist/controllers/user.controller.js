"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = void 0;
const asyncHandler_middleware_1 = require("../middlewares/asyncHandler.middleware");
const http_config_1 = require("../config/http.config");
const user_service_1 = require("../services/user.service");
exports.getUsersController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const users = await (0, user_service_1.getUsersService)(userId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Users retrieved successfully",
        users
    });
});
