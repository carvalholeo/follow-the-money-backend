import { celebrate } from "celebrate";
import express from "express";

import activatedUser from "../../middlewares/Activated";
import authenticatedUser from "../../middlewares/Auth";
import validSession from "../../middlewares/ValidSessionToken";

import ProfileValidator from "../../validators/ProfileValidator";
import TokenValidator from "../../validators/TokenValidator";
import UserValidator from "../../validators/UserValidator";

import ProfileController from "../../controllers/ProfileController";
import SessionController from "../../controllers/SessionController";
import UserController from "../../controllers/UserController";


const profileController = new ProfileController();
const sessionController = new SessionController();
const userController = new UserController();

const profileRoutes = express.Router();

profileRoutes.use(authenticatedUser);
profileRoutes.use(validSession);
profileRoutes.use(activatedUser);

profileRoutes
  .delete("/", celebrate(TokenValidator), userController.delete)
  .put("/block", celebrate(TokenValidator), userController.block, sessionController.destroyAll)
  .put("/user-data", celebrate(UserValidator.updateUser()), userController.update)
  .put("/", celebrate(ProfileValidator), profileController.update)
  .post("/", celebrate(ProfileValidator), profileController.create)
  .get("/", celebrate(TokenValidator), profileController.index);

export default profileRoutes;

