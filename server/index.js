import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import Routes from "./src/routes.js";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use("/", Routes);

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running on http://localhost:${PORT}`)
        });

    })
    .catch((ERROR) => {
        console.log(ERROR);
    });