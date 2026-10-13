import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import {
  artifactsDELETE,
  artifactsGET,
  artifactsPATCH,
  artifactsPOST,
  eachArtifactGET,
  highestLikeArtifactGET,
  myArtifactsGET,
} from "../controllers/artifacts.controllers.js";
const router = express.Router();

//! Specific Routes
router.post("/", verifyToken, artifactsPOST);
router.get("/", artifactsGET);
router.get("/highest-like-count", highestLikeArtifactGET);
router.get("/my-artifacts", verifyToken, myArtifactsGET);

//! **Note**: Dynamic Routes must be created after all the specific routes were defined

//! Dynamic Routes
router.get("/:id", eachArtifactGET);
router.patch("/:id", verifyToken, artifactsPATCH);
router.delete("/:id", verifyToken, artifactsDELETE);

export default router;
