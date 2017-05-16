const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { Comments, User, Post } = require('../../models');

router.get('/', (req, res) => { // tested & working as intended
  Comments.findAll({
    where: {
      postId: req.query.postId
    }, 
    include: [{
      model: User,
      as: 'author',
      attributes: ['first_name', 'last_name']
    }]
  })
  .then((comments) => {
    res.send(comments);
  })
  .catch((err) => {
    console.error(chalk.red(err.message));
  })
});

router.post('/', (req, res) => { // 
  const sessionUser = req.session.user;
  const commentContent = req.body.content;
  const commentAuthorId = req.body.userId;
  const commentPostId = req.body.postId;

  // user is NOT logged in OR user does NOT have permission to create comment
  if (!sessionUser || !sessionUser.permissions || (sessionUser && sessionUser.permissions.indexOf('comment_add') === -1) ) {
    res.sendStatus(401);
    return;
  }

  // user left at least 1 field blank
  if (!commentContent || !commentAuthorId || !commentPostId) {
    res.status(200).send('Please fill out all required fields.');;
    return;
  }

  // user is trying to create comment for another user
  if (sessionUser.id !== +commentAuthorId) {
    res.sendStatus(401);
    return;
  }

  // check if post exists
  Post.findById(commentPostId)
  .then((post) => {
    // post exists - create comment and send response
    if (post) {
      Comments.create({
        content: commentContent,
        authorId: commentAuthorId,
        postId: commentPostId
      })
      .then((comment) => {
        res.send(comment);
      })
      .catch((err) => {
        console.error(err.message);
      })
    // post does not exist, send 404
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    res.sendStatus(400);
  });
});

// router.put('/:commentId', (req, res) => {
//   if (!req.session.user && req.session.user.permissions.indexOf('comment_edit') === -1) {
//     res.sendStatus(401);
//     return;
//   }
//
//   Comments.update({
//     content: req.body.content
//   }, {
//     where: {
//       id: req.params.commentId
//     }
//   })
//   .then((updatedCount) => {
//     if (updatedCount[0]) {
//       res.sendStatus(200);
//     } else {
//       res.sendStatus(204);
//     }
//   })
//   .catch((err) => {
//     console.error(err.message);
//   })
// });

// router.delete('/:commentId', (req, res) => {
//   if (!req.session.user && req.session.user.permissions.indexOf('comment_delete') === -1) {
//     res.sendStatus(401);
//     return;
//   }
//
//   Comments.destroy({
//     where: {
//       id: req.params.commentId
//     }
//   })
//   .then((deletedCount) => {
//     if (deletedCount > 0) {
//       res.sendStatus(200);
//     } else {
//       res.sendStatus(204);
//     }
//   })
//   .catch((err) => {
//     console.error(err.message);
//   })
// });

module.exports = router;
