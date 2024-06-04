import dotenv from 'dotenv';
import express from 'express'
import http from "http";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from '../route/userRoute'
import adminRouter from '../route/adminRoute';
import errorHandler from '../../usecaseLayer/handler/errorHandler';
import workerRouter from '../route/workerRoute';
import chatRouter from '../route/chatRoute';
import { SocketManager } from '../services/Socket';


dotenv.config();
export const app = express()
app.use(cors());
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(morgan('dev'))

const httpServer = http.createServer(app);
//socket.io connection
const socket = new SocketManager(httpServer);

// Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/worker", workerRouter);
app.use("/api/chat", chatRouter);

// error handler middleware
app.use(errorHandler)

export { httpServer };