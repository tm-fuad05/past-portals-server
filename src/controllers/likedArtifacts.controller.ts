import { client } from "../config/dbConnect.js";

const database = client.db("ArtifactsDB");
const likedArtifactCollection = database.collection("Liked Artifacts");

// Like Artifact (Post)
export async function likeArtifact(req, res) {
  const likedArtifact = req.body;
  const result = await likedArtifactCollection.insertOne(likedArtifact);
  res.send(result);
}

// All Liked Artifacts GET
export async function likedArtifactsGET(_, res) {
  const result = await likedArtifactCollection.find().toArray();
  res.send(result);
}

// Users specific Liked Artifacts GET
export async function myLikedArtifactsGET(req, res) {
  const email = req.query.email;
  if (req.user.email !== email) {
    return res.status(403).send({ message: "Forbiddedn access" });
  }

  const result = await likedArtifactCollection
    .find({ likedEmail: email })
    .toArray();
  res.send(result);
}
