const { Sequelize, db, Post } = require('./post');
const { User } = require('./user');

db.sync({ force: true });

// Post.belongsTo(User, { as: 'author' });
// User.hasMany(Post);

module.exports = { Sequelize, db, Post, User };