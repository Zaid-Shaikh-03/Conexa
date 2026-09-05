"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_config_1 = require("../config/passport.config");
const user_controller_1 = require("../controllers/user.controller");
const userRoutes = (0, express_1.Router)()
    .use(passport_config_1.passportAuthenticateJwt)
    .get('/all', user_controller_1.getUsersController);
exports.default = userRoutes;
