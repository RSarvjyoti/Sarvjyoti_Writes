import express from "express";
import { connectDb } from "./config/db.js";
import {config} from 'dotenv'
import  userRoute  from "./routes/user.route.js";
import authRoute from './routes/auth.route.js'

config();
const app = express();
const PORT = process.env.PORT || 9080
const DB_URL = process.env.MONGO_URL

// app routes

app.use(express.json());
app.use('/api', userRoute);
app.use('/api/auth', authRoute);

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