const { Sequelize, db } = require('./db');

const Comments = db.define('comment', {
  content: {
    type: Sequelize.TEXT
  }
});

module.exports = { Sequelize, db, Comments };
