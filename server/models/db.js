const Sequelize = require('sequelize');
// const db = new Sequelize('postgres://localhost:5432/blog_react_redux');
const db = new Sequelize('postgres://gampoglpucnkym:dda9a24aec17c3922b9b5fe81ebb7a7a6c9246961173d2f46dd370613adc55ea@ec2-107-20-141-145.compute-1.amazonaws.com:5432/d5i2uhdgu3hvdi');

module.exports = { Sequelize, db };