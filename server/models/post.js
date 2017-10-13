const { Sequelize, db } = require('./db');
const marked = require('marked');
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
    type: Sequelize.TEXT,
    get() {
      let intro = this.getDataValue('intro_paragraph');

      if (intro) {
        return intro;
      } else {
        intro = this.getDataValue('content');
        if (intro.length > 255) {
          intro = intro.substr(0,75);
        }
        return `${intro}...`;
      }
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  markedContent: {
    type: Sequelize.VIRTUAL, 
    get() {
      return marked(this.getDataValue('content'));
    }
  }, 
  slug: {
    type: Sequelize.STRING,
  }
}, {
  hooks: {
    beforeCreate: (post, options) => {
      const title = post.getDataValue('title');
      const slug = title.split(' ').map((word) => {
        return word.toLowerCase();
      }).join('-');
      post.slug = slug;
    }
  }
});

module.exports = { Sequelize, db, Post };
