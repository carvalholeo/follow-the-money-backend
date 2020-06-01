const express = require('express');
const unauthenticatedRoutes = require('./routes/unauthenticated/routes');
const authenticatedRoutes = require('./routes/authenticated/routes');
const adminRoutes = require('./routes/admin/routes');
const { errors } = require('celebrate');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(unauthenticatedRoutes);

app.use(authenticatedRoutes);

app.use(adminRoutes);
app.use(errors());

module.exports = app;