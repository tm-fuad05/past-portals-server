import express from "express";
import { UploadController } from "../controllers/upload.controller.js";
import multer from "multer";
import verifyToken from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  "/artifacts",
  upload.single("image"),
  verifyToken,
  UploadController.uploadArtifactImage,
);

export const UploadRouter = router;
