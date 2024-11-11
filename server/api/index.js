import express from "express";
import { connectDb } from "./config/db.js";
import {config} from 'dotenv'

config();
const app = express();
const PORT = process.env.PORT || 9080
const DB_URL = process.env.MONGO_URL
app.get('/', (req, res) => {
    res.send("This is home route");
})

app.listen(PORT, async () => {
    await connectDb(DB_URL)
    console.log(`Server is runnig at http://localhost:${PORT}`);
})