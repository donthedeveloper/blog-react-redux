const express = require('express');
const router = express.Router();
const chalk = require('chalk');

router.get('/', (req, res) => {
  console.log(chalk.yellow('Session:'));
  console.dir(req.session);

  res.send(req.session.user);

});

module.exports = router;
