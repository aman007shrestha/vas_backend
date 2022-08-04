import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./misc/logger";
import appRouter from "./routes";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(appRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("API is up and running");
});

app.listen(PORT, () => {
  console.clear();
  logger.info(`server is running on port ${PORT}`);
});
