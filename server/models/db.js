const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/blog-react-redux');

module.exports = { Sequelize, db };