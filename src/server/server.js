/* eslint-disable import/no-extraneous-dependencies */
// These babel plugins allow for some nice syntactic sugar on the server where it is not being built by webpack
require('babel-polyfill');
require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// A quick middleware that helped make sure I wasn't making typos with my client queries
app.use((req, res, next) => {
  console.log('Request path: ', req.path);
  console.log('Request: ', req.method);
  next();
});

// Implement parsing for the json so I can pass objects from the client to the server
app.use(bodyParser.json());
const port = process.env.PORT || 8080;
const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
