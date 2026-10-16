import "dotenv/config";
import { connectDB } from "./config/dbConnect.js";
import app from "./app.js";
const port = process.env.PORT || 5000;

app.listen(port, async () => {
  await connectDB();
  console.log(`Pastportal Running..... on Port: ${port}`);
});
