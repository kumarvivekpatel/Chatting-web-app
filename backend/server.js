import  express  from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import path from 'path'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import {app, server} from './socket/socket.js'

import connectToMongoDB from "./db/connectToMongoDB.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming req. with JSON paylods (from req.body)
app.use(cookieParser()) // To use cookies in requests and responses

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname,"frontend", "dist","index.html"))
})

server.listen(PORT,() =>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});