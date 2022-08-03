import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App initialized at port ${PORT}`);
});
