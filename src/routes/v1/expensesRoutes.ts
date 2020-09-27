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

const routes = express.Router();

routes.use(authenticatedUser);
routes.use(validSession);
routes.use(activatedUser);

routes.get("/",
  celebrate(ExpenseValidator.getExpense()),
  expensesController.index);

routes.post("/",
  celebrate(ExpenseValidator.postExpense()),
  expensesController.create);

routes.put("/:id",
  celebrate(ExpenseValidator.putExpense()),
  expensesController.update);

routes.delete("/:id",
  celebrate(ExpenseValidator.deleteExpense()),
  expensesController.delete);

routes.get("/categories",
  celebrate(TokenValidator),
  expenseCategoriesController.index);

routes.get("/types",
  celebrate(TokenValidator),
  expenseTypesController.index);


routes.use(isAdmin);

routes.post("/categories",
  celebrate(TypeAndCategoryValidator.createTypeAndCategory()),
  expenseCategoriesController.create);

routes.put("/categories/:id/",
  celebrate(TypeAndCategoryValidator.updateTypeAndCategory()),
  expenseCategoriesController.update);

routes.delete("/categories/:id/",
  celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()),
  expenseCategoriesController.delete);

routes.post("/types",
  celebrate(TypeAndCategoryValidator.createTypeAndCategory()),
  expenseTypesController.create);

routes.put("/types/:id/",
  celebrate(TypeAndCategoryValidator.updateTypeAndCategory()),
  expenseTypesController.update);

routes.delete("/types/:id/",
  celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()),
  expenseTypesController.delete);


export default routes;