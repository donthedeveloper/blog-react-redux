const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { Post } = require('../../models');

// get all of posts from database
router.get('/', (req, res) => {
  Post.findAll({
    order: [['id', 'ASC']]
  })
  .then((posts) => {
    res.send(posts);
  })
  .catch(console.error);
});

// get one post from database
router.get('/:postId', (req, res) => {
  Post.findById(req.params.postId)
  .then((post) => {
    res.send(post)
  })
  .catch(console.error);
});

// create one post in database (admin)
router.post('/', (req, res) => {

  if ( !req.session.user || (req.session.user && req.session.user.permissions.indexOf('post_add') === -1) ) {
    res.sendStatus(401);
    return;
  }

  Post.create({
    title: req.body.title,
    intro_paragraph: req.body.introParagraph,
    content: req.body.content
  })
  .then((post) => {
    res.send(post);
  })
  .catch(console.error);
});

// update one post in database (admin)
router.put('/:postId', (req, res) => {
  if ( !req.session.user || (req.session.user && req.session.user.permissions.indexOf('post_edit') === -1) ) {
    res.sendStatus(401);
    return;
  }

  Post.update({
    title: req.body.title,
    intro_paragraph: req. body.introParagraph,
    content: req.body.content
  }, {
    where: {
      id: req.params.postId
    }
  })
  .then((updatedCount) => {
    if (updatedCount[0]) {
      res.sendStatus(200);
    } else {
      res.sendStatus(204);
    }
  })
  .catch(console.error);
});

// delete one post from database (admin)
router.delete('/:postId', (req, res) => {
  if ( !req.session.user || (req.session.user && req.session.user.permissions.indexOf('post_delete') === -1) ) {
    res.sendStatus(401);
    return;
  }

  Post.destroy({
    where: {
      id: req.params.postId
    }
  })
  .then((deletedCount) => {
    if (deletedCount > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(204);
    }
  })
  .catch(console.error);
});

module.exports = router;
