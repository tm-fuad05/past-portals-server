import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { ArtifactService } from "../services/artifact.service.js";

// Artifacts Post
async function addArtifact(req: Request, res: Response) {
  try {
    const artifact = req.body;

    const result = await ArtifactService.addArtifactInDB(artifact);

    if (!result?._id) {
      return res.status(400).json({
        success: false,
        message: "Failed to create artifact",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Successfully added.",
      data: result,
    });
  } catch (error: any) {
    console.error("POST Artifact Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// All artifacts get
async function getAllArtifacts(req: Request, res: Response) {
  try {
    const { search } = req.query;

    const artifacts = await ArtifactService.getAllArtifactsFromDB(
      search as string,
    );

    return res.status(200).json({
      success: true,
      data: artifacts,
    });
  } catch (error: any) {
    console.error("GET Artifact Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Each artifact
async function getArtifactById(req: Request, res: Response) {
  try {
    const artifactId = req.params.id;

    if (!ObjectId.isValid(artifactId as string)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Artifact ID" });
    }

    const artifact = await ArtifactService.getArtifactByIdFromDB(
      artifactId as string,
    );

    if (!artifact) {
      return res.status(404).json({
        success: false,
        message: "Artifact not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: artifact,
    });
  } catch (error: any) {
    console.error("GET Specific Artifact Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Highest Liked Artiafacts
async function getHighestLikeArtifacts(req: Request, res: Response) {
  try {
    const highestLikedArtifacts =
      await ArtifactService.getHighestLikedArtifactsFromDB();

    return res.status(200).json({
      success: true,
      data: highestLikedArtifacts,
    });
  } catch (error: any) {
    console.error("GET Highest LIked Artifact Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//My Artifacts
async function getMyAddedArtifacts(req: Request, res: Response) {
  try {
    const email = req.query.email;

    if (req.user && req.user.email !== email) {
      return res
        .status(403)
        .send({ success: false, message: "Forbidden access" });
    }

    const myArtifacts = await ArtifactService.getMyAddedArtifactsFromDB(
      email as string,
    );

    return res.status(200).json({
      success: true,
      data: myArtifacts,
    });
  } catch (error: any) {
    console.error("My Added Artifacts Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//  Artifacts edit
async function editArtifact(req: Request, res: Response) {
  try {
    const artifactId = req.params.id;

    if (!ObjectId.isValid(artifactId as string)) {
      return res.status(400).send({ message: "Invalid Artifact ID" });
    }

    const updatedMyArtifactData = req.body;

    const existingArtifact = await ArtifactService.getArtifactByIdFromDB(
      artifactId as string,
    );

    if (req.user?.email !== existingArtifact?.artifactAdderEmail) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access. You can't edit another person's data!",
      });
    }

    const result = await ArtifactService.editArtifactFromDB(
      artifactId as string,
      updatedMyArtifactData,
    );

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Failed to edit data",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully edited artifact data.",
      data: result,
    });
  } catch (error: any) {
    console.error("PATCH Artifact Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//  Artifacts delete
async function deleteArtifact(req: Request, res: Response) {
  try {
    const artifactId = req.params.id;

    if (!ObjectId.isValid(artifactId as string)) {
      return res.status(400).send({ message: "Invalid Artifact ID" });
    }

    const existingArtifact = await ArtifactService.getArtifactByIdFromDB(
      artifactId as string,
    );

    if (req.user?.email !== existingArtifact?.artifactAdderEmail) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access. You can't delete another person's data!",
      });
    }

    const result = await ArtifactService.deleteArtifactFromDB(
      artifactId as string,
    );

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete data",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully deleted.",
      data: result,
    });
  } catch (error: any) {
    console.error("DELETE Artifact Error:", error?.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//Like an artifact
async function likeAnArtifact(req: Request, res: Response) {
  const artifactId = req.params.id;
  const userEmail = req.user?.email;

  const result = await ArtifactService.likeAnArtifactInDB(
    artifactId as string,
    userEmail as string,
  );

  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Failed to like",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Liked",
  });
}

export const ArtifactController = {
  getAllArtifacts,
  getArtifactById,
  addArtifact,
  editArtifact,
  deleteArtifact,
  getHighestLikeArtifacts,
  getMyAddedArtifacts,
  likeAnArtifact,
};
