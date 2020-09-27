import { celebrate } from "celebrate";
import express from "express";

import activatedUser from "../../middlewares/Activated";
import authenticatedUser from "../../middlewares/Auth";
import isAdmin from "../../middlewares/Administration";
import validSession from "../../middlewares/ValidSessionToken";

import RevenueValidator from "../../validators/RevenueValidator";
import TokenValidator from "../../validators/TokenValidator";
import TypeAndCategoryValidator from "../../validators/TypeAndCategoryValidator";

import RevenuesController from "../../controllers/RevenuesController";
import RevenueCategoriesController from "../../controllers/RevenueCategoriesController";

const revenuesController = new RevenuesController();
const revenueCategoriesController = new RevenueCategoriesController();

const revenuesRoutes = express.Router();

revenuesRoutes.use(authenticatedUser);
revenuesRoutes.use(validSession);
revenuesRoutes.use(activatedUser);

revenuesRoutes
  .get("/", celebrate(RevenueValidator.getRevenue()), revenuesController.index)
  .get("/categories/", celebrate(TokenValidator), revenueCategoriesController.index)
  .post("/", celebrate(RevenueValidator.createRevenue()), revenuesController.create)
  .put("/:id/", celebrate(RevenueValidator.updateRevenue()), revenuesController.update)
  .delete("/:id/", celebrate(RevenueValidator.deleteRevenue()), revenuesController.delete);

revenuesRoutes.use(isAdmin);

revenuesRoutes
  .post("/categories", celebrate(TypeAndCategoryValidator.createTypeAndCategory()), revenueCategoriesController.create)
  .put("/categories/:id/", celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), revenueCategoriesController.update)
  .delete("/categories/:id/", celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), revenueCategoriesController.delete);

export default revenuesRoutes;
