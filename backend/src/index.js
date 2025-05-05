import express from "express";
import dotenv from "dotenv"
import cookieparser from "cookie-parser";
import cors from 'cors';

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { app,server,io } from "./lib/socket.js";


dotenv.config();

const PORT = process.env.PORT
const __dirname = path.resolve();
const allowedOrigins = ["http://localhost:5173", "https://yap-yap-7p0x.onrender.com"];


app.use(express.json())
app.use(cookieparser())
app.use(
    cors({
      origin: allowedOrigins,
      credentials:true,
    })
  );

// Removed manual CORS headers middleware to avoid conflicts with cors package
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
})

server.listen(PORT,()=>{
    console.log(" server is running on PORT:"+ PORT);
    connectDB()
});