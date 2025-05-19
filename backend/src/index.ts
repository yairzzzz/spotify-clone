import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import path from "path";
import cors from "cors";

import { connectDB } from "./lib/db.ts";

import userRoutes from "./routes/user.route.ts";
import authRoutes from "./routes/auth.route.ts";
import adminRoutes from "./routes/admin.route.ts";
import songRoutes from "./routes/song.route.ts";
import albumRoutes from "./routes/album.route.ts";
import statsRoutes from "./routes/stats.route.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use(clerkMiddleware()); // adds auth to req obj => e.g: req.auth.useId
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //10MB max file size
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

//error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port 5000", PORT);
  connectDB();
});
