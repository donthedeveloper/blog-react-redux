const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { User } = require('../../models');

router.post('/', (req, res) => {
  console.log(chalk.yellow('Session:'));
  console.dir(req.session);

  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then((user) => {

    // validated plain password with encrypted password
    if (user.validPassword(req.body.password)) {
      req.session.user = user;
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }

  })
  .catch((err) => {
    console.error(chalk.red(err.message));
  });

//   res.send();
});

module.exports = router;
