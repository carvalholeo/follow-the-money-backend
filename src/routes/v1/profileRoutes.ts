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

const routes = express.Router();

routes.use(authenticatedUser);
routes.use(validSession);
routes.use(activatedUser);

routes
  .delete("/", celebrate(TokenValidator), userController.delete)
  .put("/block", celebrate(TokenValidator), userController.block, sessionController.destroyAll)
  .put("/user-data", celebrate(UserValidator.updateUser()), userController.update)
  .post("/", celebrate(ProfileValidator), profileController.create)
  .put("/", celebrate(ProfileValidator), profileController.update)
  .get("/", celebrate(TokenValidator), profileController.index);

export default routes;
