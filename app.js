const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const router = require('./server/routes');

const chalk = require('chalk');

// middleware
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/templates'))
app.use(express.static('browser/public'));

app.use('/', router);

app.listen(3000, function() {
  console.log( chalk.blue('App is listening on port 3000.') );
});