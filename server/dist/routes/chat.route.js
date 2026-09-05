"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_config_1 = require("../config/passport.config");
const chat_controller_1 = require("../controllers/chat.controller");
const message_controller_1 = require("../controllers/message.controller");
const chatRoutes = (0, express_1.Router)()
    .use(passport_config_1.passportAuthenticateJwt)
    .post('/create', chat_controller_1.createChatController)
    .post('/message/send', message_controller_1.sendMessageController)
    .get('/all', chat_controller_1.getUserChatsController)
    .get('/:id', chat_controller_1.getSingleChatController);
exports.default = chatRoutes;
