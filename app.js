const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');

const chalk = require('chalk');


const router = require('./server/routes');

// middleware
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  cookieName: 'session',
  secret: 'random_string',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 100
}));

app.use(express.static('server/templates'));
app.use('/public', express.static(path.join(__dirname, 'browser/public')))

app.use('/', router);

app.listen(process.env.PORT || 3001, function() {
  console.log( chalk.blue(`App is listening on port ${this.address().port}`) );
});