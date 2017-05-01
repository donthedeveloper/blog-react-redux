const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { Comments } = require('../../models');

router.get('/', (req, res) => {
  Comments.findAll({
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
  console.log('content:', req.body);
  Comments.create({
    content: req.body.content,
    authorId: req.body.userId,
    postId: req.body.postId
    // parentId: req.body.parentId
  })
  .then((comment) => {
    res.send(comment);
  })
  .catch((err) => {
    console.error(err.message);
  })
});

router.put('/:commentId', (req, res) => {
  Comments.update({
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
  Comments.destroy({
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

module.exports = router;
