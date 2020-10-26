import { Router } from "express";

import activatedUser from "../../middlewares/Activated";
import authenticatedUser from "../../middlewares/Auth";
import validSession from "../../middlewares/ValidSessionToken";

import MFAValidator from "../../validators/MFAValidator";
import TokenValidator from "../../validators/TokenValidator";
import UserValidator from "../../validators/UserValidator";

import SessionController from "../../controllers/SessionController";
import ErrorValidation from "../../middlewares/ErrorValidation";

const sessionController = new SessionController();

const sessionRoutes = Router();

sessionRoutes
  .get("/mfa",
    MFAValidator.token,
    ErrorValidation,
    sessionController.showMFA)
  .post("/",
    UserValidator.loginUser,
    ErrorValidation,
    sessionController.create)
  .post("/mfa",
    MFAValidator.mfaRequired,
    ErrorValidation,
    sessionController.validateMFA);

sessionRoutes.use(authenticatedUser);
sessionRoutes.use(validSession);
sessionRoutes.use(activatedUser);

sessionRoutes
  .delete("/",
    TokenValidator,
    ErrorValidation,
    sessionController.destroy)
  .delete("/all",
    TokenValidator,
    ErrorValidation,
    sessionController.destroyAll);

export default sessionRoutes;
