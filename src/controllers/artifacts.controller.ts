import { ObjectId } from "mongodb";
import { client } from "../config/dbConnect.js";

const database = client.db("ArtifactsDB");
const artifactsCollection = database.collection("ArtifactsData");

// Artifacts Post
export async function artifactsPOST(req, res) {
  const artifacts = req.body;
  const result = await artifactsCollection.insertOne(artifacts);
  res.send(result);
}

// All artifacts get
export async function artifactsGET(req, res) {
  const { search } = req.query;

  let query = {};
  if (search) {
    query.artifactName = {
      $regex: search.toString(),
      $options: "i",
    };
  }

  const result = await artifactsCollection.find(query).toArray();
  res.send(result);
}

// Each artifact
export async function eachArtifactGET(req, res) {
  const id = req.params.id;
  //   if (!ObjectId.isValid(id)) {
  //     return res.status(400).send({ message: "Invalid Artifact ID" });
  //   }

  const result = await artifactsCollection.findOne({
    _id: new ObjectId(id),
  });

  res.send(result);
}

// Highest Liked Artiafacts
export async function highestLikeArtifactGET(_, res) {
  const result = await artifactsCollection
    .find()
    .sort({ likeCount: -1 })
    .limit(6)
    .toArray();
  res.send(result);
}

//My Artifacts
export async function myArtifactsGET(req, res) {
  const email = req.query.email;
  if (req.user.email !== email) {
    return res.status(403).send({ message: "Forbiddedn access" });
  }

  const myArtifacts = await artifactsCollection
    .find({
      artifactAdderEmail: email,
    })
    .toArray();
  res.send(myArtifacts);
}

//  Artifacts edit
export async function artifactsPATCH(req, res) {
  const id = req.params.id;
  //   if (!ObjectId.isValid(id)) {
  //     return res.status(400).send({ message: "Invalid Artifact ID" });
  //   }

  const updatedMyArtifactData = req.body;

  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: updatedMyArtifactData,
  };

  const result = await artifactsCollection.updateOne(filter, updatedDoc);
  res.send(result);
}

//  Artifacts delete
export async function artifactsDELETE(req, res) {
  const id = req.params.id;
  //   if (!ObjectId.isValid(id)) {
  //     return res.status(400).send({ message: "Invalid Artifact ID" });
  //   }

  const result = await artifactsCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
}
