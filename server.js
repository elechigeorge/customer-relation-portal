// IMPORT DOTENV & CONFIGURE
import dotenv from "dotenv";
dotenv.config();
// IMPORT PACKAGES
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
const __dirname = path.resolve();

// IMPORT ROUTE FILES
import Branch from "./route/branch.js";
import Complaint from './route/complaint.js';
import Customer from './route/customer.js';
import Manager from './route/manager.js';
import Admin from './route/admin.js';
import ImageUploadService from './services/image_upload.js';

// INITIALIZE EXPRESS SERVER
const server = express();

// CONFIGURE MIDDLEWARES
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// CONNECT TO MONGODB DATABASE FROM ATLAS
mongoose
  .connect(process.env.MONGOURI)
  .then((conn) => console.log("Database connected successfully..."))
  .catch((error) => console.error("Database connection error" + error));

// PRODUCTION ENVIRONMENT SETTING
server.use(express.static(path.resolve(__dirname, "./frontend/build")));

// ROUTES SETTING
server.use("/branch", Branch);
server.use("/complaint", Complaint);
server.use("/customer", Customer);
server.use("/manager", Manager);
server.use("/admin", Admin);
server.use("/upload", ImageUploadService);

server.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

const PORT = process.env.PORT || 4000;
const HOST = "herokuapp.com";

// LAUNCH SERVER ROCKET
server.listen(PORT, () => console.log("SERVER RESOURCES RUNNING ON PORT 4000"));