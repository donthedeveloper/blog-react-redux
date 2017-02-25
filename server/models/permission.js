const { Sequelize, db } = require('./db');

const Permission = db.define('permission', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = { Sequelize, db, Permission };