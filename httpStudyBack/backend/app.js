import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import indexRouter from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const corsOption = {
  origin: ["http://localhost:8090"],
  credentials: true,
};

app.use(cors(corsOption));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", indexRouter);

const mongoURI = process.env.DB_ADDRESS;

mongoose
  .connect(mongoURI)
  .then(() => console.log("server connect success"))
  .catch((err) => console.log("DB connection fail", err));

app.listen(process.env.PORT || 5000, () => {
  console.log("server on");
});
