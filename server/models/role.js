const { Sequelize, db } = require('./db');

const Role = db.define('role', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = { Sequelize, db, Role };