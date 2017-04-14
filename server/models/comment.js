const { Sequelize, db } = require('./db');

const Comment = db.define('comment', {
  content: {
    type: Sequelize.TEXT
  }
});

module.exports = { Sequelize, db, Comment };
