import z from "zod";

const createArtifactSchema = z.object({
  artifactName: z
    .string({ error: "Artifact name is required " })
    .trim()
    .min(2, { error: "Name must be at least 2 characters" }),
  artifactImage: z.string({ error: "Image is required" }),
  artifactType: z.string({ error: "Artifact type is required" }),
  historicalContext: z
    .string({ error: "Historical Context is required" })
    .min(20, { error: "Must be at least 20 characters" })
    .trim(),
  createdTime: z.string({ error: "Creation time is required" }).trim(),
  discoveredTime: z.string({ error: "Discovery time is required" }).trim(),
  discoveredBy: z.string({ error: "Discovered By is required" }).trim(),
  presentLocation: z.string({ error: "Present location is required" }).trim(),
  artifactAdderName: z
    .string({ error: "Artifact adder name is required" })
    .trim()
    .min(3),
  artifactAdderEmail: z
    .email({ error: "Invalid adder email address" })
    .trim()
    .toLowerCase(),
  likedBy: z.array(z.email({ error: "Invalid email" }).trim()).default([]),
});

const updateArtifactSchema = createArtifactSchema.partial();

const querySchema = z.object({
  search: z.string({ error: "Search query must be string" }).trim().optional(),
});

export type ArtifactInput = z.infer<typeof createArtifactSchema>;

export const ArtifactValidation = {
  createArtifactSchema,
  updateArtifactSchema,
  querySchema,
};
