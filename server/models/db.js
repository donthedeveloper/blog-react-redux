const {dbConfig} = require('../config');

const Sequelize = require('sequelize');
const db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host, 
    dialect: 'postgres'
});

module.exports = { Sequelize, db };