import { model, Schema } from "mongoose";
import { ArtifactInput } from "../validation/artifact.validation.js";

const artifactSchema = new Schema<ArtifactInput>(
  {
    artifactName: {
      type: String,
      required: true,
      trim: true,
    },
    artifactImage: {
      type: String,
      required: true,
      trim: true,
    },
    artifactType: {
      type: String,
      required: true,
      trim: true,
    },
    historicalContext: {
      type: String,
      required: true,
      trim: true,
    },
    createdTime: {
      type: String,
      required: true,
      trim: true,
    },
    discoveredTime: {
      type: String,
      required: true,
      trim: true,
    },
    discoveredBy: {
      type: String,
      required: true,
      trim: true,
    },
    presentLocation: {
      type: String,
      required: true,
      trim: true,
    },
    artifactAdderName: {
      type: String,
      required: true,
      trim: true,
    },
    artifactAdderEmail: {
      type: String,
      required: true,
      trim: true,
    },
    likedBy: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const Artifact = model<ArtifactInput>("Artifact", artifactSchema);
