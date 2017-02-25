const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { User } = require('../../models');

router.post('/', (req, res) => {
  console.log(chalk.yellow('Session:'));
  console.dir(req.session);
  
  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
  .then((user) => {
    if (user) {
      req.session.user = user;
    }
    
    res.send();
  })
  .catch((err) => {
    console.error(chalk.red(err.message));
  });
  
//   res.send();
});

module.exports = router;