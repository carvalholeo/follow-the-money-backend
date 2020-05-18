const express = require('express');
const routes = require('./routes');
const{ errors } = require('celebrate');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;