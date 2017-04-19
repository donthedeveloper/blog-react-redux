const { Sequelize, db } = require('./db');

const bcrypt = require('bcrypt');
// const saltRounds = 10;

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set: function (plainPassword) {
      this.setDataValue('password', this.generateHash(plainPassword));
    }
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  // displayName: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // }
}, {
  instanceMethods: {
    generateHash: function(plainPassword) {
        return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10), null);
    },
    validPassword: function(plainPassword) {
        return bcrypt.compareSync(plainPassword, this.password);
    }
  }
});

module.exports = { Sequelize, db, User };
