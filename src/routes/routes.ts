import express from "express";

import version_1 from "./version_1";

const routes = express.Router();

routes.use("/v1", version_1);

export default routes;
