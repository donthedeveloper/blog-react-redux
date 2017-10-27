const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('client-sessions');
// const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const chalk = require('chalk');

require('dotenv').config()

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

app.engine('html', nunjucks.render);
app.set('view engine', 'html');

const nunjucksConfigure = nunjucks.configure('server/templates', {
  noCache: true, 
  autoescape: true, 
  express: app
});

// and then include these two lines of code to add the extension:
const AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
nunjucksConfigure.addExtension('AutoEscapeExtension', new AutoEscapeExtension(nunjucksConfigure));

app.use(express.static('browser/public'));

app.use('/', router);

app.listen(process.env.PORT || 3001, function() {
  console.log( chalk.blue(`App is listening on port ${this.address().port}`) );
});

module.exports = app;