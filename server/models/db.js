const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/blog_react_redux');

module.exports = { Sequelize, db };