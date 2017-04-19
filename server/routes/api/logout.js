const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { User } = require('../../models');

router.post('/', (req, res) => {
  req.session.reset();
  res.sendStatus(200);
});

module.exports = router;
