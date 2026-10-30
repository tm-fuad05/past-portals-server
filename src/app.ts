import { JwtRouter } from "./routes/jwt.route.js";
import { ArtifactRouter } from "./routes/artifact.route.js";
import { LikedArtifactRouter } from "./routes/likedArtifact.route.js";

import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UploadRouter } from "./routes/upload.route.js";
import { connectDB } from "./config/dbConnect.js";
const app: Application = express();

app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(
  cors({
    origin: ["http://localhost:5173", "https://pastportalsbd.vercel.app"],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Jwt Api
app.use("/api/v1/auth", JwtRouter);
// Artifacts Api
app.use("/api/v1/artifacts", ArtifactRouter);
// Liked Artifacts Api
app.use("/api/v1/liked-artifacts", LikedArtifactRouter);
// Cloudinary upload image
app.use("/api/v1/upload-image", UploadRouter);

app.get("/", (_, res) => {
  res.send({
    success: true,
    message: "Running PastPortals Server....",
  });
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Server Error:", err);
  res.status(500).json({
    success: false,
    message: err?.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err?.stack,
  });
});

export default app;
