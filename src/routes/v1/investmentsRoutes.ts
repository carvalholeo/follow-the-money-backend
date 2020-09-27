import { celebrate } from "celebrate";
import express from "express";

import activatedUser from "../middlewares/Activated";
import authenticatedUser from "../middlewares/Auth";
import isAdmin from "../middlewares/Administration";
import validSession from "../middlewares/ValidSessionToken";

import InvestmentCategoriesController from "../controllers/InvestmentCategoriesController";
import InvestmentTypesController from "../controllers/InvestmentTypesController";
import TypeAndCategoryValidator from "../validators/TypeAndCategoryValidator";

import TokenValidator from "../validators/TokenValidator";

const investmentCategoriesController = new InvestmentCategoriesController();
const investmentTypesController = new InvestmentTypesController();

const routes = express.Router();

routes.use(authenticatedUser);
routes.use(validSession);
routes.use(activatedUser);


routes.get("/categories/",
  celebrate(TokenValidator),
  investmentCategoriesController.index);

routes.get("/types/",
  celebrate(TokenValidator),
  investmentTypesController.index);


routes.use(isAdmin);

routes.post("/types",
  celebrate(TypeAndCategoryValidator.createTypeAndCategory()),
  investmentTypesController.create);

routes.put("/types/:id/",
  celebrate(TypeAndCategoryValidator.updateTypeAndCategory()),
  investmentTypesController.update);

routes.delete("/types/:id/",
  celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()),
  investmentTypesController.delete);

routes.post("/categories",
  celebrate(TypeAndCategoryValidator.createTypeAndCategory()),
  investmentCategoriesController.create);

routes.put("/categories/:id/",
  celebrate(TypeAndCategoryValidator.updateTypeAndCategory()),
  investmentCategoriesController.update);

routes.delete("/categories/:id/",
  celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()),
  investmentCategoriesController.delete);


export default routes;