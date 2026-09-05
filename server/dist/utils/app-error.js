"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = exports.BadRequestException = exports.NotFoundException = exports.InternalServerException = exports.AppError = exports.ErrorCodes = void 0;
const http_config_1 = require("../config/http.config");
exports.ErrorCodes = {
    ERR_INTERNAL: "ERR_INTERNAL",
    ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
    ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
    ERR_FORBIDDEN: "ERR_FORBIDDEN",
    ERR_NOT_FOUND: "ERR_NOT_FOUND",
};
class AppError extends Error {
    statusCode;
    errorCode;
    constructor(message, statusCode = http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode = exports.ErrorCodes.ERR_INTERNAL) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class InternalServerException extends AppError {
    constructor(message = "Internal Server Error") {
        super(message, http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR, exports.ErrorCodes.ERR_INTERNAL);
    }
}
exports.InternalServerException = InternalServerException;
class NotFoundException extends AppError {
    constructor(message = "Resource Not Found") {
        super(message, http_config_1.HTTPSTATUS.NOT_FOUND, exports.ErrorCodes.ERR_NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends AppError {
    constructor(message = "Bad Request") {
        super(message, http_config_1.HTTPSTATUS.BAD_REQUEST, exports.ErrorCodes.ERR_BAD_REQUEST);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends AppError {
    constructor(message = "Unauthorized Access") {
        super(message, http_config_1.HTTPSTATUS.UNAUTHORIZED, exports.ErrorCodes.ERR_UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
