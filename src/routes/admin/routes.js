const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const authenticatedUser = require('../../middlewares/Auth');
const activatedUser = require('../../middlewares/Activated');
const validSession = require('../../middlewares/ValidSessionToken');
const isAdmin = require('../../middlewares/Administration');

const TypeAndCategoryValidator = require('../../validators/TypeAndCategoryValidator');

const ExpenseCategoriesController = require('../../controllers/ExpenseCategoriesController');
const ExpenseTypesController = require('../../controllers/ExpenseTypesController');
const InvestmentTypesController = require('../../controllers/InvestmentTypesController');
const InvestmentCategoriesController = require('../../controllers/InvestmentCategoriesController');
const RevenueCategoriesController = require('../../controllers/RevenueCategoriesController');

const routes = express.Router();

routes.use(authenticatedUser);
routes.use(validSession);
routes.use(activatedUser);
routes.use(isAdmin);

//Expenses categories
routes.post('/expenses/categories/create', 
    celebrate(TypeAndCategoryValidator.createTypeAndCategory()), 
    ExpenseCategoriesController.create);

routes.put('/expenses/categories/:id/update', 
    celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), 
    ExpenseCategoriesController.update);

routes.delete('/expenses/categories/:id/delete', 
    celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), 
    ExpenseCategoriesController.delete);



//Expenses types
routes.post('/expenses/types/create', 
    celebrate(TypeAndCategoryValidator.createTypeAndCategory()), 
    ExpenseTypesController.create);

routes.put('/expenses/types/:id/update', 
    celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), 
    ExpenseTypesController.update);

routes.delete('/expenses/types/:id/delete', 
    celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), 
    ExpenseTypesController.delete);



//Investments types
routes.post('/investments/types/create', 
    celebrate(TypeAndCategoryValidator.createTypeAndCategory()), 
    InvestmentTypesController.create);

routes.put('/investments/types/:id/update', 
    celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), 
    InvestmentTypesController.update);

routes.delete('/investments/types/:id/delete', 
    celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), 
    InvestmentTypesController.delete);

    

//Investments categories
routes.post('/investments/categories/create', 
    celebrate(TypeAndCategoryValidator.createTypeAndCategory()), 
    InvestmentCategoriesController.create);

routes.put('/investments/categories/:id/update', 
    celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), 
    InvestmentCategoriesController.update);

routes.delete('/investments/categories/:id/delete', 
    celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), 
    InvestmentCategoriesController.delete);



//Revenue categories
routes.post('/revenues/categories/create', 
    celebrate(TypeAndCategoryValidator.createTypeAndCategory()), 
    RevenueCategoriesController.create);

routes.put('/revenues/categories/:id/update', 
    celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), 
    RevenueCategoriesController.update);

routes.delete('/revenues/categories/:id/delete', 
    celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), 
    RevenueCategoriesController.delete);

module.exports = routes;