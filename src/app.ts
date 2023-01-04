import express from "express";
import "dotenv/config";
import { router } from "./routes";
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server road on port ${port}`);
});
