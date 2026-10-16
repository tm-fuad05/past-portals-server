import { Artifact } from "../model/artifactSchema.js";

async function getAllLikedArtifactsFromDB() {
  const likedArtifacts = await Artifact.find({
    likedBy: { $ne: [] },
  }).lean();
  return likedArtifacts;
}

async function getMyLikedArtifactsFromDB(email: string) {
  const myLikedArtifacts = await Artifact.find({
    likedBy: { $in: [email] },
  }).lean();

  return myLikedArtifacts;
}

export const LikedArtifactService = {
  getAllLikedArtifactsFromDB,
  getMyLikedArtifactsFromDB,
};
