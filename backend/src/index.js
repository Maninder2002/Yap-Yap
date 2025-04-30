import express from "express";
import dotenv from "dotenv"
import cookieparser from "cookie-parser";
import cors from 'cors';

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieparser())
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials:true,
    })
  );

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT,()=>{
    console.log(" server is running on PORT:"+ PORT);
    connectDB()
});