import "dotenv/config";
import app from "../src/app.js";
import { connectDB } from "../src/config/dbConnect.js";

// Ensure database is connected before handling requests
connectDB().catch((err) => console.error("DB Connection Error:", err));

export default app;
