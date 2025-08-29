import express from "express"; 
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/media", express.static("public/media"));
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.get("*", (_, res) => res.sendFile(path.resolve("public", "feed.html")));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () =>
    console.log(`Server running: http://localhost:${PORT}`)
  ))
  .catch(err => console.log(err));
