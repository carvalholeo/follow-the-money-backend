import { Router } from 'express';

import isAdmin from '../../middlewares/Administration';
import activatedUser from '../../middlewares/Activated';
import authenticatedUser from '../../middlewares/Auth';
import validSession from '../../middlewares/ValidSessionToken';

import ExpensesController from '../../controllers/ExpensesController';
import ExpenseCategoriesController from '../../controllers/ExpenseCategoriesController';
import ExpenseTypesController from '../../controllers/ExpenseTypesController';
import TypeAndCategoryValidator from '../../validators/TypeAndCategoryValidator';

import ExpenseValidator from '../../validators/ExpenseValidator';
import TokenValidator from '../../validators/TokenValidator';
import ErrorValidation from '../../middlewares/ErrorValidation';

const expensesController = new ExpensesController();
const expenseCategoriesController = new ExpenseCategoriesController();
const expenseTypesController = new ExpenseTypesController();

const expensesRoutes = Router();

expensesRoutes.use(authenticatedUser);
expensesRoutes.use(validSession);
expensesRoutes.use(activatedUser);

expensesRoutes
  .get('/',
    ExpenseValidator.getExpense,
    ErrorValidation,
    expensesController.index)
  .get('/categories',
    TokenValidator,
    ErrorValidation,
    expenseCategoriesController.index)

  .get('/types',
    TokenValidator,
    ErrorValidation,
    expenseTypesController.index)

  .post('/',
    ExpenseValidator.postExpense,
    ErrorValidation,
    expensesController.create)
  .put('/:id',
    ExpenseValidator.putExpense,
    ErrorValidation,
    expensesController.update)
  .delete('/:id',
    ExpenseValidator.deleteExpense,
    ErrorValidation,
    expensesController.delete);


expensesRoutes.use(isAdmin);

expensesRoutes
  .post('/categories',
    TypeAndCategoryValidator.createTypeAndCategory,
    ErrorValidation,
    expenseCategoriesController.create)
  .post('/types',
    TypeAndCategoryValidator.createTypeAndCategory,
    ErrorValidation,
    expenseTypesController.create)
  .put('/categories/:id/',
    TypeAndCategoryValidator.updateTypeAndCategory,
    ErrorValidation,
    expenseCategoriesController.update)
  .put('/types/:id/',
    TypeAndCategoryValidator.updateTypeAndCategory,
    ErrorValidation,
    expenseTypesController.update)
  .delete('/categories/:id/',
    TypeAndCategoryValidator.deleteTypeAndCategory,
    ErrorValidation,
    expenseCategoriesController.delete)
  .delete('/types/:id/',
    TypeAndCategoryValidator.deleteTypeAndCategory,
    ErrorValidation,
    expenseTypesController.delete);


export default expensesRoutes;
