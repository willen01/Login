import express from "express";
import "dotenv/config";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(router);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server road on port ${port}`);
});
