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

const routes = express.Router();

routes.post("/",
  celebrate(UserValidator.loginUser()),
  sessionController.create);

routes.get("/mfa",
  celebrate(MFAValidator.token()),
  sessionController.showMFA);

routes.post("/mfa",
  celebrate(MFAValidator.mfaRequired()),
  sessionController.validateMFA);


routes.use(authenticatedUser);
routes.use(validSession);
routes.use(activatedUser);

routes.delete("/",
  celebrate(TokenValidator),
  sessionController.destroy);

routes.delete("/all",
  celebrate(TokenValidator),
  sessionController.destroyAll);


export default routes;