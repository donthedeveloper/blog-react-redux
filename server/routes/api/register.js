const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { User } = require('../../models');

router.post('/', (req, res) => {
  
  // create 
  User.create(req.body)
  .then((user) => {
    console.log(user);
    res.send(user);
  })
  .catch((err) => {
    res.send(err.message);
  })
});

module.exports = router;