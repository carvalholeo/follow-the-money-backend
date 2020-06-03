const express = require('express');
const { celebrate } = require('celebrate');

const UserValidator = require('../../validators/UserValidator');
const MFAValidator = require('../../validators/MFAValidator');

const SessionController = require('../../controllers/SessionController');
const UserController = require('../../controllers/UserController');

const routes = express.Router();

routes.post('/session', celebrate(UserValidator.loginUser()), SessionController.create);
routes.get('/session/mfa', celebrate(MFAValidator.token()), SessionController.showMFA);
routes.post('/session/mfa', celebrate(MFAValidator.mfaRequired()), SessionController.validateMFA);

routes.post('/users', celebrate(UserValidator.createUser()), UserController.create);

module.exports = routes;