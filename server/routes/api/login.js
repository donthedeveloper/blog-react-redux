const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { User, Role } = require('../../models');

router.post('/', (req, res) => { // tested: secure, but should not be able to be accessed if user is already logged in
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then((user) => {

    // validated plain password with encrypted password
    if (user && user.validPassword(req.body.password)) {

      req.session.user = user.dataValues;
      delete req.session.user.password;

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
