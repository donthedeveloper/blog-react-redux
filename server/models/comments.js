const { Sequelize, db } = require('./db');

const Comments = db.define('comment', {
  content: {
    type: Sequelize.TEXT, 
    allowNull: false
  }
});

module.exports = { Sequelize, db, Comments };
