import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import { LikedArtifactController } from "../controllers/likedArtifact.controller.js";

const router = express.Router();

router.get("/", verifyToken, LikedArtifactController.getAllLikedArtifacts);
router.get(
  "/my-liked-artifacts",
  verifyToken,
  LikedArtifactController.getMyLikedArtifacts,
);

export const LikedArtifactRouter = router;
