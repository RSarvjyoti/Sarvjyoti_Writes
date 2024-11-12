import express from "express";
import { connectDb } from "./config/db.js";
import {config} from 'dotenv'
import  userRoute  from "./routes/user.route.js";

config();
const app = express();
const PORT = process.env.PORT || 9080
const DB_URL = process.env.MONGO_URL

// app routes

app.use('/api', userRoute);

app.listen(PORT, async () => {
    await connectDb(DB_URL)
    console.log(`Server is runnig at http://localhost:${PORT}`);
})