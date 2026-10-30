import express from "express";
import { UploadController } from "../controllers/upload.controller.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/artifacts",
  upload.single("image"),
  verifyToken,
  UploadController.uploadArtifactImage,
);

router.post("/users", upload.single("image"), UploadController.uploadUserImage);

export const UploadRouter = router;
