const bcrypt = require('bcrypt');
const chalk = require('chalk');
const { Sequelize, db } = require('./db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        args: true, 
        msg: 'Please enter a valid email address.'
      }
    },
    unique: {
      args: true, 
      msg: 'That email is already signed up.'
    }
  },
  password: {
    type: Sequelize.STRING, 
    set(plainPassword) {
      if (plainPassword) {
        this.setDataValue('password', this.generateHash(plainPassword));
      }
    }
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  }
});

User.prototype.generateHash = function(plainPassword) {
  return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10), null);
};

User.prototype.validPassword = function(plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

module.exports = { Sequelize, db, User };
