import jwtRouter from "./routes/jwt.routes.js";
import artifactsRouter from "./routes/artifacts.routes.js";
import likedArtifactsRouter from "./routes/likedArtifacts.routes.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://pastportalsbd.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Jwt Api
app.use("/api/v1/auth", jwtRouter);

// Artifacts Api
app.use("/api/v1/all-artifacts", artifactsRouter);

// Liked Artifacts Api
app.use("/api/v1/liked-artifacts", likedArtifactsRouter);

app.get("/", (_, res) => {
  res.send({
    success: true,
    message: "Running PastPortals Server....",
  });
});

export default app;
