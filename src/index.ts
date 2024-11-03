import express from "express";

export const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/api", (req: express.Request, res: express.Response) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
