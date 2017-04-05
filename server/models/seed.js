const { db, User, Post, Role, Permission } = require('./index');
const chalk = require('chalk');

const users = [
  {
    firstname: "Don",
    lastname: "Hansen",
    username: "donthedeveloper",
    password: "password",
    email: "test@gmail.com"
  }
];

const posts = [
  {
    title: "Guest Post",
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    title: "First week at Fullstack Academy",
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    title: "IDK Post",
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

const roles = [
  {
    name: 'user'
  },
  {
    name: 'admin'
  }
];

const permissions = [
  { name: 'user_add' },
  { name: 'user_edit' },
  { name: 'comment_add' },
  { name: 'comment_edit' },
  { name: 'comment_delete' },
  { name: 'user_add' },
  { name: 'user_edit' },
  { name: 'user_delete' },
  { name: 'post_add' },
  { name: 'post_edit' },
  { name: 'post_delete' }
];




db.sync({ force: true })
.then(() => {
  console.log(chalk.blue("Dropped old data."));

  // CREATE USERS
  return User.create(users[0]);
})
.then((users) => {
  console.log(chalk.green("Successfully seeded users table."));

  // CREATE POSTS
  return Post.bulkCreate(posts, { individualHooks: true });
})
.then(function(posts) {
  console.log(chalk.green("Successfully seeded posts table"));

  // CREATE ROLES
  return Role.bulkCreate(roles, { individualHooks: true });
})
.then((roles) => {
  console.log(chalk.green("Successfully seeded roles table"));

  // CREATE PERMISSIONS
  return Permission.bulkCreate(permissions, { individualHooks: true });
})
.then((permissions) => {
  console.log(chalk.green("Successfully seeded permissions table"));
})
.catch((err) => {
  console.error(chalk.red('There was totally a problem:'), err.message);
});
