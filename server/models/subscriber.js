const { Sequelize, db } = require('./db');
const chalk = require('chalk');

const Subscriber = db.define('subscriber', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

module.exports = { Sequelize, db, Subscriber };
