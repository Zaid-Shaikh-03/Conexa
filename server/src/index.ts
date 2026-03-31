import cookieParser from "cookie-parser";
import "dotenv/config"
import express, { type Request, type Response } from "express";
import cors from "cors";
import passport from "passport";
import http from "http";
import { Env } from "./config/env.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import connectDatabase from "./config/database.config";
import { initializeSocket } from "./lib/socket";
import routes from "./routes";

import "./config/passport.config";

const app = express();
const server = http.createServer(app);

initializeSocket(server)


app.use(express.json( {limit : "10mb"}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
        origin: Env.FRONTEND_ORIGIN,
        credentials: true
    })
)

app.use(passport.initialize());

app.get("/health", asyncHandler(async(req:Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({
        message: "Server is healthy",
        status: "Ok"
    })
}))

app.use('/api',routes)

app.use(errorHandler)

server.listen(Env.PORT, async () => {
    await connectDatabase()
    console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
})