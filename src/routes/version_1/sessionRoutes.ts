import { celebrate } from "celebrate";
import express from "express";

import activatedUser from "../../middlewares/Activated";
import authenticatedUser from "../../middlewares/Auth";
import validSession from "../../middlewares/ValidSessionToken";

import MFAValidator from "../../validators/MFAValidator";
import TokenValidator from "../../validators/TokenValidator";
import UserValidator from "../../validators/UserValidator";

import SessionController from "../../controllers/SessionController";

const sessionController = new SessionController();

const sessionRoutes = express.Router();

sessionRoutes
  .get("/mfa", celebrate(MFAValidator.token()), sessionController.showMFA)
  .post("/", celebrate(UserValidator.loginUser()), sessionController.create)
  .post("/mfa", celebrate(MFAValidator.mfaRequired()), sessionController.validateMFA);

sessionRoutes.use(authenticatedUser);
sessionRoutes.use(validSession);
sessionRoutes.use(activatedUser);

sessionRoutes
  .delete("/", celebrate(TokenValidator), sessionController.destroy)
  .delete("/all", celebrate(TokenValidator), sessionController.destroyAll);

export default sessionRoutes;
