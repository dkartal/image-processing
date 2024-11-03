import express from "express";
import imageRoutes from "./routes/imageRoutes";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", imageRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

export default app;
