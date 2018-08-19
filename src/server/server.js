/* eslint-disable import/no-extraneous-dependencies */
require('babel-polyfill');
require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  console.log('what is our req', req.path);
  console.log('what is our req type', req.method);
  next();
});

app.use(bodyParser.json());
const port = process.env.PORT || 8080;
const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
