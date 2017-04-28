const { Sequelize, db, Post } = require('./post');
const { User } = require('./user');
const { Role } = require('./role');
const { Permission } = require('./permission');
const { Comments } = require('./comment');
const { Subscriber } = require('./subscriber');

Post.belongsTo(User, { as: 'author' });
Comments.belongsTo(User, { as: 'author' });
Comments.belongsTo(Post);
Comments.belongsTo(Comments, { as: 'parent' })
User.hasMany(Post);
User.belongsTo(Role); //
// Role.hasMany(User);
Role.belongsToMany(Permission, { through: 'RolePermission' });
Permission.belongsToMany(Role, { through: 'RolePermission' });

module.exports = { Sequelize, db, Post, User, Role, Permission, Comment, Subscriber };
