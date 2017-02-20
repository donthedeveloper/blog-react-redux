const { Sequelize, db } = require('./db');

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING
  },
  intro_paragraph: {
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: function(post) {
      if (!post.intro_paragraph) {
        const intro = post.content.substr(0,75);
        post.intro_paragraph = `${intro}...`;
      }
    }
  },
  setterMethods: {
    urlTitle: function(value) {
      return this.title.trim().replace(/\s+/g, '-');
    }
  }
});

module.exports = { Sequelize, db, Post };