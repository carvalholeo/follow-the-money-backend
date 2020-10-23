import { celebrate } from "celebrate";
import express from "express";

import activatedUser from "../../middlewares/Activated";
import authenticatedUser from "../../middlewares/Auth";
import isAdmin from "../../middlewares/Administration";
import validSession from "../../middlewares/ValidSessionToken";

import InvestmentCategoriesController from "../../controllers/InvestmentCategoriesController";
import InvestmentTypesController from "../../controllers/InvestmentTypesController";
import TypeAndCategoryValidator from "../../validators/TypeAndCategoryValidator";

import TokenValidator from "../../validators/TokenValidator";

const investmentCategoriesController = new InvestmentCategoriesController();
const investmentTypesController = new InvestmentTypesController();

const investmentsRoutes = express.Router();

investmentsRoutes.use(authenticatedUser);
investmentsRoutes.use(validSession);
investmentsRoutes.use(activatedUser);

investmentsRoutes
  .get("/categories/", celebrate(TokenValidator), investmentCategoriesController.index)
  .get("/types/", celebrate(TokenValidator), investmentTypesController.index);

investmentsRoutes.use(isAdmin);

investmentsRoutes
  .post("/types", celebrate(TypeAndCategoryValidator.createTypeAndCategory()), investmentTypesController.create)
  .post("/categories", celebrate(TypeAndCategoryValidator.createTypeAndCategory()), investmentCategoriesController.create)
  .put("/types/:id/", celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), investmentTypesController.update)
  .put("/categories/:id/", celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), investmentCategoriesController.update)
  .delete("/types/:id/", celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), investmentTypesController.delete)
  .delete("/categories/:id/", celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), investmentCategoriesController.delete);

export default investmentsRoutes;
