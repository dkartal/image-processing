import dotenv from "dotenv";
import express from "express";
import imageRoutes from "./routes/imageRoutes";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is not defined in the environment variables");
}

app.use(express.json());

app.use("/api", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
