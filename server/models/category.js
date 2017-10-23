const { Sequelize, db } = require('./db');
const marked = require('marked');
const chalk = require('chalk');

const Category = db.define('category', {
    name: Sequelize.STRING
});

module.exports = { Sequelize, db, Category };
