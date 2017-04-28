const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { Comment } = require('../../models');

router.get('/', (req, res) => {
  Comment.findAll({
    where: req.body.postId
  })
  .then((comments) => {
    res.send(comments)
  })
  .catch((err) => {
    console.error(err.message);
  })
});

router.post('/', (req, res) => {
  Comment.create({
    content: req.body.content,
    author: req.body.userId,
    parent: req.body.parentId
  })
  .then((comment) => {
    res.send(comment);
  })
  .catch((err) => {
    console.error(err.message);
  })
});

router.put('/:commentId', (req, res) => {
  Comment.update({
    content: req.body.content
  }, {
    where: {
      id: req.params.commentId
    }
  })
  .then((updatedCount) => {
    if (updatedCount[0]) {
      res.sendStatus(200);
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err.message);
  })
});

router.delete('/:commentId', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.commentId
    }
  })
  .then((deletedCount) => {
    if (deletedCount > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    console.error(err.message);
  })
});
