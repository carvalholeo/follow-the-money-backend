import { celebrate } from "celebrate";
import express from "express";

import UserValidator from "../../validators/UserValidator";

import UserController from "../../controllers/UserController";

const userController = new UserController();

const usersRoutes = express.Router();

usersRoutes.post("/", celebrate(UserValidator.createUser()), userController.create);

export default usersRoutes;
