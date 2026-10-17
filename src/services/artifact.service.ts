import { ArtifactInput } from "../validation/artifact.validation.js";
import { Artifact } from "../model/artifactSchema.js";

async function addArtifactInDB(payload: ArtifactInput) {
  const result = await Artifact.create(payload);

  return result;
}

async function getAllArtifactsFromDB(search: string) {
  let query = {};
  if (search) {
    query = {
      artifactName: {
        $regex: search.toString(),
        $options: "i",
      },
    };
  }

  const artifacts = await Artifact.find(query).select("-likedBy").lean();
  return artifacts;
}

async function getArtifactByIdFromDB(artifactId: string) {
  const artifact = await Artifact.findById(artifactId)
    .select("-likedBy")
    .lean();
  return artifact;
}

async function getHighestLikedArtifactsFromDB() {
  const highestLikedArtifacts = await Artifact.aggregate([
    {
      $addFields: {
        likeCount: {
          $size: "$likedBy",
        },
      },
    },
    {
      $sort: {
        likeCount: -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  return highestLikedArtifacts;
}

async function getMyAddedArtifactsFromDB(email: string) {
  const myArtifacts = await Artifact.find({
    artifactAdderEmail: email,
  }).lean();

  return myArtifacts;
}

async function editArtifactFromDB(
  artifactId: string,
  payload: Partial<ArtifactInput>,
) {
  const updatedDoc = {
    $set: payload,
  };

  const result = await Artifact.findByIdAndUpdate(artifactId, updatedDoc, {
    new: true,
  });
  return result;
}

async function deleteArtifactFromDB(artifactId: string) {
  const result = await Artifact.findByIdAndDelete(artifactId);
  return result;
}

async function likeAnArtifactInDB(artifactId: string, email: string) {
  const existingArtifact = await Artifact.findById(artifactId);

  const isLiked = existingArtifact?.likedBy?.includes(email);

  let updateDoc = {};

  if (isLiked) {
    updateDoc = {
      $pull: { likedBy: email },
    };
  } else {
    updateDoc = {
      $addToSet: { likedBy: email },
    };
  }

  const result = await Artifact.findByIdAndUpdate(artifactId, updateDoc);
  return result;
}

export const ArtifactService = {
  addArtifactInDB,
  getAllArtifactsFromDB,
  getArtifactByIdFromDB,
  getHighestLikedArtifactsFromDB,
  getMyAddedArtifactsFromDB,
  editArtifactFromDB,
  deleteArtifactFromDB,
  likeAnArtifactInDB,
};
