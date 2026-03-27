import { Router } from "express"
import { authStatusController, logoutController, loignController, registerController } from "../controllers/auth.controller"
import { passportAuthenticateJwt } from "../config/passport.config"

const authRoutes = Router()
    .post('/register',registerController)
    .post('/login',loignController)
    .post('/logout',logoutController)
    .get('/status',passportAuthenticateJwt,authStatusController)

export default authRoutes