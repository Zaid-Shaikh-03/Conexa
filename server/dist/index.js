"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const http_1 = __importDefault(require("http"));
const env_config_1 = require("./config/env.config");
const asyncHandler_middleware_1 = require("./middlewares/asyncHandler.middleware");
const http_config_1 = require("./config/http.config");
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const database_config_1 = __importDefault(require("./config/database.config"));
const socket_1 = require("./lib/socket");
const routes_1 = __importDefault(require("./routes"));
require("./config/passport.config");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, socket_1.initializeSocket)(server);
app.use(express_1.default.json({ limit: "10mb" }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: env_config_1.Env.FRONTEND_ORIGIN,
    credentials: true,
}));
app.use(passport_1.default.initialize());
app.get("/health", (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Server is healthy",
        status: "Ok",
    });
}));
app.use("/api", routes_1.default);
if (env_config_1.Env.NODE_ENV === "production") {
    const clientPath = path_1.default.resolve(__dirname, "../../client/dist/");
    app.use(express_1.default.static(clientPath));
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path_1.default.join(clientPath, "index.html"));
    });
}
else {
    app.get("/", (req, res) => {
        res.json({
            message: "API is running",
            env: env_config_1.Env.NODE_ENV,
            docs: "/health",
        });
    });
}
app.use(errorHandler_middleware_1.errorHandler);
server.listen(env_config_1.Env.PORT, async () => {
    await (0, database_config_1.default)();
    console.log(`Server running on port ${env_config_1.Env.PORT} in ${env_config_1.Env.NODE_ENV} mode`);
});
