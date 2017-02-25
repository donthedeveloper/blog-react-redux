const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { Comment } = require('../../models');

// router.get('/:postId', (req, res) => {
//   Comment.findAll({
//     where: 
//   })
//   .then(res.send)
//   .catch(console.error)
// });