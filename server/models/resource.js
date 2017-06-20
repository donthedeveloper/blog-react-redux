const { Sequelize, db } = require('./db');

const Resource = db.define('resource', {
  resourceType: {
      type: Sequelize.ENUM('article', 'video'), 
      validate: {
          notEmpty: {
              args: true, 
              msg: 'Resource type is required.'
          }
      }
  }, 
  URL: {
      type: Sequelize.TEXT, 
      validate: {
          isURL: {
              args: true, 
              msg: 'Resource URL is required.'
          }
      }
  }
}, {
    hooks: {
        beforeValidate: function (model, options) {
            model.resourceType = model.resourceType || '';
        }
    }
});

module.exports = { Sequelize, db, Resource };