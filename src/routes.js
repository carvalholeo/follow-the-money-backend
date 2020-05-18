const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const OngValidator = require('./validators/OngValidator');
const IncidentValidator = require('./validators/IncidentValidator');
const ProfileValidator = require('./validators/ProfileValidator')

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.post('/ongs', OngValidator.post, OngController.create);
routes.get('/ongs', OngController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentValidator.get, IncidentController.index);
routes.delete('/incidents/:id', IncidentValidator.delete, IncidentController.delete);

routes.get('/profile', ProfileValidator.get, ProfileController.index);

module.exports = routes;