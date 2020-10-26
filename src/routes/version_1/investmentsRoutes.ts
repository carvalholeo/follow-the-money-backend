import { Router } from "express";

import activatedUser from "../../middlewares/Activated";
import authenticatedUser from "../../middlewares/Auth";
import isAdmin from "../../middlewares/Administration";
import validSession from "../../middlewares/ValidSessionToken";

import InvestmentCategoriesController from "../../controllers/InvestmentCategoriesController";
import InvestmentTypesController from "../../controllers/InvestmentTypesController";
import TypeAndCategoryValidator from "../../validators/TypeAndCategoryValidator";

import TokenValidator from "../../validators/TokenValidator";
import ErrorValidation from "../../middlewares/ErrorValidation";

const investmentCategoriesController = new InvestmentCategoriesController();
const investmentTypesController = new InvestmentTypesController();

const investmentsRoutes = Router();

investmentsRoutes.use(authenticatedUser);
investmentsRoutes.use(validSession);
investmentsRoutes.use(activatedUser);

investmentsRoutes
  .get("/categories/",
    TokenValidator,
    ErrorValidation,
    investmentCategoriesController.index)

  .get("/types/",
    TokenValidator,
    ErrorValidation,
    investmentTypesController.index);

investmentsRoutes.use(isAdmin);

investmentsRoutes
  .post("/types",
    TypeAndCategoryValidator.createTypeAndCategory,
    ErrorValidation,
    investmentTypesController.create)
  .post("/categories",
    TypeAndCategoryValidator.createTypeAndCategory,
    ErrorValidation,
    investmentCategoriesController.create)
  .put("/types/:id/",
    TypeAndCategoryValidator.updateTypeAndCategory,
    ErrorValidation,
    investmentTypesController.update)
  .put("/categories/:id/",
    TypeAndCategoryValidator.updateTypeAndCategory,
    ErrorValidation,
    investmentCategoriesController.update)
  .delete("/types/:id/",
    TypeAndCategoryValidator.deleteTypeAndCategory,
    ErrorValidation,
    investmentTypesController.delete)
  .delete("/categories/:id/",
    TypeAndCategoryValidator.deleteTypeAndCategory,
    ErrorValidation,
    investmentCategoriesController.delete);

export default investmentsRoutes;
