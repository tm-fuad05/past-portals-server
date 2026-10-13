import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import {
  likeArtifact,
  likedArtifactsGET,
  myLikedArtifactsGET,
} from "../controllers/likedArtifacts.controller.js";

const router = express.Router();

router.post("/", verifyToken, likeArtifact);
router.get("/", likedArtifactsGET);
router.get("/my-liked-artifacts", verifyToken, myLikedArtifactsGET);

export const LikedArtifactRouter = router;
