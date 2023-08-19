import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import reviewRoute from "./routes/review.js";

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
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);

app.listen(port, () => {
    connect();
    console.log("Server is running on port :", port);
});