const { db, User, Post, Role, Permission } = require('./index');
const chalk = require('chalk');

// const users = [
//   {
//     first_name: "Don",
//     lastname: "Hansen",
//     username: "donthedeveloper",
//     password: "password",
//     email: "test@gmail.com"
//   }
// ];

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
  { name: 'comment_add', roleId: 1 },
  { name: 'comment_edit', roleId: 1 },
  { name: 'comment_delete', roleId: 1 },
  { name: 'user_add', roleId: 1 },
  { name: 'user_edit', roleId: 1 },
  { name: 'user_delete', roleId: 2 },
  { name: 'post_add', roleId: 2 },
  { name: 'post_edit', roleId: 2 },
  { name: 'post_delete', roleId: 2 }
];




db.sync({ force: true })
.then(() => {
  console.log(chalk.blue("Dropped old data."));
//
//   // CREATE USERS
//   return User.create(users[0]);
// })
// .then((users) => {
//   console.log(chalk.green("Successfully seeded users table."));

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
