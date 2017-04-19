const { Sequelize, db } = require('./db');

const Permission = db.define('permission', {
  name: {
    type: Sequelize.STRING,
    unique: false
  }
});

module.exports = { Sequelize, db, Permission };
