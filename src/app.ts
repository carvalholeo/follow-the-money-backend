import express from "express";
import { errors } from "celebrate";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

import routes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(routes);
app.use(errors());

export default app;
