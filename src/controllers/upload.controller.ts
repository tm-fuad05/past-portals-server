import { Request, Response } from "express";
import { UploadService } from "../services/upload.service.js";

async function uploadArtifactImage(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await UploadService.uploadArtifactImageInCloudinary(
      req.file,
    );

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const UploadController = {
  uploadArtifactImage,
};
