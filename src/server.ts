import "dotenv/config";
import { connectDB } from "./config/dbConnect.js";
import app from "./app.js";
const port = process.env.PORT || 5000;

let isDbConnected = false;

// Middleware to ensure DB is connected before handling any request
app.use(async (_, __, next) => {
  if (!isDbConnected) {
    await connectDB().catch((err) => console.error("Database Connection Error:", err));
    isDbConnected = true;
  }
  next();
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, async () => {
    await connectDB();
    isDbConnected = true;
    console.log(`Pastportal Running..... on Port: ${port}`);
  });
}

export default app;
