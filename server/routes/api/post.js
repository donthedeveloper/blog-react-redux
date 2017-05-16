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
    if (post) {
      res.send(post);
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    res.sendStatus(400);
  });
});

// create one post in database (admin)
router.post('/', (req, res) => {
  const sessionUser = req.session.user;
  const title = req.body.title;
  const introParagraph = req.body.introParagraph;
  const content = req.body.content;

  console.log(sessionUser);

  // user is NOT logged in OR user does NOT have permission to create comment
  if ( !sessionUser || !sessionUser.permissions || (sessionUser && sessionUser.permissions.indexOf('post_add') === -1) ) {
    res.sendStatus(401);
    return;
  }

  // user left at least 1 field blank
  if (!title || !content) {
    res.status(400).send('Please fill out all required fields.');;
    return;
  }

  Post.create({
    title: title,
    intro_paragraph: introParagraph,
    content: content
  })
  .then((post) => {
    res.send(post);
  })
  .catch((err) => {
    res.sendStatus(400);
  });
});

// update one post in database (admin)
router.put('/:postId', (req, res) => {
  const sessionUser = req.session.user;

  console.log(sessionUser);

  // if (!sessionUser) {
  //   res.sendStatus(401);
  //   return;
  // }

  // if (!sessionUser.permissions) {
  //   res.sendStatus(401);
  //   return;
  // }

  // if (sessionUser.permissions.indexOf('post_edit') === -1) {
  //   res.sendStatus(401);
  //   return;
  // }

  if ( !sessionUser || !sessionUser.permissions || (sessionUser && sessionUser.permissions.indexOf('post_edit') === -1) ) {
    res.sendStatus(401);
    return;
  }

  Post.update({
    title: req.body.title,
    intro_paragraph: req.body.introParagraph,
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
  const sessionUser = req.session.user;

  if ( !sessionUser || !sessionUser.permissions || (sessionUser && sessionUser.permissions.indexOf('post_delete') === -1) ) {
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
