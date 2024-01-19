import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.route.js";
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const dbUrl = process.env.DB_URL;
const PORT = process.env.PORT || 4000;
const connection = mongoose.connection;
try {
  mongoose.connect(dbUrl);
  connection.on("connected", () => {
    console.log("Mongo db connection successful");
  });
  connection.on("error", () => {
    console.log("Mongo db connection error");
  });
} catch (error) {
  console.log(error.message);
}
app.use((req, res, next) => {
  console.log(req.path, req.body);
  next();
});

app.use("/posts", postRoutes);

app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));
