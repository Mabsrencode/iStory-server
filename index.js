import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.route.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

const dbUrl = process.env.DB_URL;
const PORT = process.env.PORT || 4000;

const connection = mongoose.connection;

try {
  mongoose.connect(dbUrl);
} catch (error) {
  console.log(error.message);
}

connection.once("open", () => {
  console.log("MongoDB connection successful");
});

connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

app.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});

app.use("/posts", postRoutes);

app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));
