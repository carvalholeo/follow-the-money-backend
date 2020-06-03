const express = require('express');
const { celebrate } = require('celebrate');

const UserValidator = require('../../validators/UserValidator');

const SessionController = require('../../controllers/SessionController');
const UserController = require('../../controllers/UserController');

const routes = express.Router();

routes.post('/session', celebrate(UserValidator.loginUser()), SessionController.create);

routes.post('/users', celebrate(UserValidator.createUser()), UserController.create);

module.exports = routes;