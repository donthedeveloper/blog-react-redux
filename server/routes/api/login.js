const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { User, Role } = require('../../models');

router.post('/', (req, res) => {

  User.findOne({
    where: {
      email: req.body.email
    },
    include: [{model: Role}]
  })
  .then((user) => {

    console.log('\n\n');
    console.dir(user);

    // validated plain password with encrypted password
    if (user && user.validPassword(req.body.password)) {
      req.session.user = user;
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }

  })
  .catch((err) => {
    console.error(chalk.red(err));
  });

});

module.exports = router;
