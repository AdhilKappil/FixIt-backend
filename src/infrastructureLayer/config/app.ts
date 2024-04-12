import dotenv from 'dotenv';

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from '../route/userRoute'
import adminRouter from '../route/adminRoute';
import errorHandler from '../../usecaseLayer/handler/errorHandler';


dotenv.config();
export const app = express()

app.use(cors({ origin: process.env.CLIENT_SERVER, credentials: true }));
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(morgan('dev'))

// Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

// error handler middleware
app.use(errorHandler)