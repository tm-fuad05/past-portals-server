import { JwtRouter } from "./routes/jwt.route.js";
import { ArtifactRouter } from "./routes/artifacts.route.js";
import { LikedArtifactRouter } from "./routes/likedArtifacts.route.js";

import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://pastportalsbd.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Jwt Api
app.use("/api/v1/auth", JwtRouter);

// Artifacts Api
app.use("/api/v1/all-artifacts", ArtifactRouter);

// Liked Artifacts Api
app.use("/api/v1/liked-artifacts", LikedArtifactRouter);

app.get("/", (_, res) => {
  res.send({
    success: true,
    message: "Running PastPortals Server....",
  });
});

export default app;
