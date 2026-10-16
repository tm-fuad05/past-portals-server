import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MongoDB uri not found!");
}

export async function connectDB() {
  try {
    await mongoose.connect(uri as string);
    console.log("MongoDB connected successfully!");
  } catch (error: any) {
    console.error("Database Connection Error Error:", error?.message);
    throw new Error("Database Connection Error:", error?.message);
  }
}

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
