import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3030;

// Test Route
app.get("/", (req, res) => {
    res.send("Api is working fine.");
});

// Database Connection
mongoose.set("strictQuery", false);
const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is connected.");
    } catch (err){
        console.log(err);
    }
}

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/tours", tourRoute);

app.listen(port, () => {
    connect();
    console.log("Server is running on port :", port);
});