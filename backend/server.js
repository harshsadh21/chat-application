import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
app.use(cors());

/// routes import
import authRoutes from "./routes/authroute.js";
import messageRoutes from "./routes/messageRoute.js";
import usersRoutes from "./routes/usersRoute.js";

//mongodb connection
import connectToMongodb from "./db/connecTODb.js";

import { app, server } from "./socket/socket.js";
// always put it before proccess.env. is used
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use("/uploads", express.static("uploads"));

app.use(express.json()); /// it convert the user json response to the javascript  object
app.use(cookieParser()); //to parse the upcoming req with json payloads
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

//
server.listen(PORT, "0.0.0.0", () => {
  connectToMongodb();
  console.log(`Server is ruuning on the port ${PORT}`);
});
