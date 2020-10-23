import { celebrate } from "celebrate";
import express from "express";

import isAdmin from "../../middlewares/Administration";
import activatedUser from "../../middlewares/Activated";
import authenticatedUser from "../../middlewares/Auth";
import validSession from "../../middlewares/ValidSessionToken";

import ExpensesController from "../../controllers/ExpensesController";
import ExpenseCategoriesController from "../../controllers/ExpenseCategoriesController";
import ExpenseTypesController from "../../controllers/ExpenseTypesController";
import TypeAndCategoryValidator from "../../validators/TypeAndCategoryValidator";

import ExpenseValidator from "../../validators/ExpenseValidator";
import TokenValidator from "../../validators/TokenValidator";

const expensesController = new ExpensesController();
const expenseCategoriesController = new ExpenseCategoriesController();
const expenseTypesController = new ExpenseTypesController();

const expensesRoutes = express.Router();

expensesRoutes.use(authenticatedUser);
expensesRoutes.use(validSession);
expensesRoutes.use(activatedUser);

expensesRoutes
  .get("/", celebrate(ExpenseValidator.getExpense()), expensesController.index)
  .get("/categories", celebrate(TokenValidator), expenseCategoriesController.index)
  .get("/types", celebrate(TokenValidator), expenseTypesController.index)
  .post("/", celebrate(ExpenseValidator.postExpense()), expensesController.create)
  .put("/:id", celebrate(ExpenseValidator.putExpense()), expensesController.update)
  .delete("/:id", celebrate(ExpenseValidator.deleteExpense()), expensesController.delete);


expensesRoutes.use(isAdmin);

expensesRoutes
  .post("/categories", celebrate(TypeAndCategoryValidator.createTypeAndCategory()), expenseCategoriesController.create)
  .post("/types", celebrate(TypeAndCategoryValidator.createTypeAndCategory()), expenseTypesController.create)
  .put("/categories/:id/", celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), expenseCategoriesController.update)
  .put("/types/:id/", celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), expenseTypesController.update)
  .delete("/categories/:id/", celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), expenseCategoriesController.delete)
  .delete("/types/:id/", celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), expenseTypesController.delete);


export default expensesRoutes;
