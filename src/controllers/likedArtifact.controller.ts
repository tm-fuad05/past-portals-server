import type { Request, Response } from "express";
import { LikedArtifactService } from "../services/likedArtifact.service.js";

// All Liked Artifacts GET
async function getAllLikedArtifacts(req: Request, res: Response) {
  try {
    const likedArtifacts =
      await LikedArtifactService.getAllLikedArtifactsFromDB();
    res.status(200).json({
      success: true,
      data: likedArtifacts,
    });
  } catch (error: any) {
    console.error("GET Liked Artifacts Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Users specific Liked Artifacts GET
async function getMyLikedArtifacts(req: Request, res: Response) {
  const email = req.query.email;

  const myLikedArtifacts = await LikedArtifactService.getMyLikedArtifactsFromDB(
    email as string,
  );

  if (myLikedArtifacts.length === 0) {
    return res.status(404).json({
      success: false,
      message: "You didn't like any artifact",
    });
  }
  return res.status(200).json({
    success: true,
    data: myLikedArtifacts,
  });
}

export const LikedArtifactController = {
  getAllLikedArtifacts,
  getMyLikedArtifacts,
};
