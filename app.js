const express = require('express');
const app = express();

const router = require('./server/routes');

const chalk = require('chalk');

app.listen(3000, function() {
  console.log( chalk('App is listening on port 3000.') );
});

app.use('/', router);