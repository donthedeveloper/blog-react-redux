const { Sequelize, db } = require('./db');
const chalk = require('chalk');

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    set: function(value) {
      this.setDataValue('title', value.trim());
    }
  },
  intro_paragraph: {
    type: Sequelize.STRING,
    get: function() {
      let intro = this.getDataValue('intro_paragraph');

      if (intro) {
        return intro;
      } else {
        intro = this.getDataValue('content');
        intro = intro.substr(0,75);
        return `${intro}...`;
      }
    }
  },
  // img route
  // img alt text
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.VIRTUAL,
    get: function() {
      const title = this.getDataValue('title');
      return title.replace(/\s+/g, '-');
    }
  }

});

module.exports = { Sequelize, db, Post };
