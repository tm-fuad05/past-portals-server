import "dotenv/config";
import app from "../src/app.js";
import { connectDB } from "../src/config/dbConnect.js";

export default async function handler(req: any, res: any) {
  await connectDB().catch((err) => console.error("DB connection error:", err));
  return app(req, res);
}
