const { Sequelize, db, Post } = require('./post');
const { User } = require('./user');
const { Role } = require('./role');
const { Permission } = require('./permission');
const { Comment } = require('./comment');

Post.belongsTo(User, { as: 'author' });
User.hasMany(Post);
User.belongsTo(Role);
Role.hasMany(User);
Role.belongsToMany(Permission, { through: 'RolePermission' });
Permission.belongsToMany(Role, { through: 'RolePermission' });

module.exports = { Sequelize, db, Post, User, Role, Permission, Comment };