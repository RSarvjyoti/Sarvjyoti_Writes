import express from "express";
import { connectDb } from "./config/db.js";
import {config} from 'dotenv'
import  userRoute  from "./routes/user.route.js";
import authRoute from './routes/auth.route.js'
import postRoute from './routes/post.route.js'
import cookieParser from 'cookie-parser';
import commentRoute from './routes/comment.route.js';
import path from 'path';
import cors from 'cors';

config();
const app = express();
const PORT = process.env.PORT || 9080
const DB_URL = process.env.MONGO_URL

// app routes
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

// ******** Deployment *******
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true // Include cookies in requests
}));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Enternal server error"
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});


app.listen(PORT, async () => {
    await connectDb(DB_URL)
    console.log(`Server is runnig at http://localhost:${PORT}`);
})