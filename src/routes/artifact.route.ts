import express from "express";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import { ArtifactController } from "../controllers/artifact.controller.js";
import { verifyRequest } from "../middlewares/verifyRequest.middleware.js";
import { ArtifactValidation } from "../validation/artifact.validation.js";
const router = express.Router();

router.post(
  "/",
  verifyToken,
  verifyRequest(ArtifactValidation.createArtifactSchema),
  ArtifactController.addArtifact,
);
router.get(
  "/",
  verifyRequest({
    query: ArtifactValidation.querySchema,
  }),
  ArtifactController.getAllArtifacts,
);
router.get("/highest-like-count", ArtifactController.getHighestLikeArtifacts);
router.get(
  "/my-artifacts",
  verifyToken,
  ArtifactController.getMyAddedArtifacts,
);

router.get("/:id", ArtifactController.getArtifactById);
router.patch(
  "/:id",
  verifyToken,
  verifyRequest(ArtifactValidation.updateArtifactSchema),
  ArtifactController.editArtifact,
);
router.delete("/:id", verifyToken, ArtifactController.deleteArtifact);

// Like an Artifact
router.patch("/like/:id", verifyToken, ArtifactController.likeAnArtifact);

export const ArtifactRouter = router;
