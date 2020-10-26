import { Router } from "express";

import UserValidator from "../../validators/UserValidator";
import ErrorValidation from "../../middlewares/ErrorValidation";
import UserController from "../../controllers/UserController";

const userController = new UserController();

const usersRoutes = Router();

usersRoutes.post("/",
  UserValidator.createAndUpdateUser,
  ErrorValidation,
  userController.create);

export default usersRoutes;
