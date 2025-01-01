require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dmsil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const database = client.db("ArtifactsDB");
    const artifactsCollection = database.collection("ArtifactsData");
    const likedArtifactCollection = database.collection("Liked Artifacts");

    // All Artifacts
    app.post("/artifacts", async (req, res) => {
      const artifacts = req.body;
      const result = await artifactsCollection.insertOne(artifacts);
      res.send(result);
    });

    // Limited 6 data (highest like Count)
    app.get("/highest-like-count", async (req, res) => {
      const result = await artifactsCollection
        .find()
        .sort({ likeCount: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    app.get("/artifacts", async (req, res) => {
      const search = req.query.search || "";

      let query = {
        artifactName: {
          $regex: search.toString(),
          $options: "i",
        },
      };

      const result = await artifactsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/each-artifact-details/:id", async (req, res) => {
      const id = req.params.id;
      const result = await artifactsCollection.findOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });

    app.patch("/artifacts/:id", async (req, res) => {
      const id = req.params.id;
      const myArtifact = req.body;
      const options = { upser: true };
      const updatedMyArtifactData = {
        $set: {
          artifactName: myArtifact.artifactName,
          artifactImage: myArtifact.artifactImage,
          artifactType: myArtifact.artifactType,
          historicalContext: myArtifact.historicalContext,
          createdAt: myArtifact.createdAt,
          discoveredAt: myArtifact.discoveredAt,
          discoveredBy: myArtifact.discoveredBy,
          presentLocation: myArtifact.presentLocation,
        },
      };
      const result = await artifactsCollection.updateOne(
        { _id: new ObjectId(id) },
        updatedMyArtifactData,
        options
      );
      res.send(result);
    });

    app.delete("/artifacts/:id", async (req, res) => {
      const id = req.params.id;
      const result = await artifactsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    //My Artifacts
    app.get("/my-artifacts", async (req, res) => {
      const email = req.query.email;
      const myArtifacts = await artifactsCollection
        .find({
          artifactAdderEmail: email,
        })
        .toArray();
      res.send(myArtifacts);
    });

    app.post("/likedArtifacts", async (req, res) => {
      const likedArtifact = req.body;
      const result = await likedArtifactCollection.insertOne(likedArtifact);
      res.send(result);
    });

    app.get("/likedArtifacts", async (req, res) => {
      const result = await likedArtifactCollection.find().toArray();
      res.send(result);
    });

    // My Liked Artifacts
    app.get("/my-liked-artifacts", async (req, res) => {
      const email = req.query.email;
      const result = await likedArtifactCollection
        .find({ likedEmail: email })
        .toArray();
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
