import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import dotenv from "dotenv";
import logger from "morgan";

dotenv.config();

import routes from "./routes/routes";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use("/api", routes);

export default app;
