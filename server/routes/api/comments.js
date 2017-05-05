const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { Comments } = require('../../models');

router.get('/', (req, res) => {
  Comments.findAll({
    where: {
      postId: req.query.postId
    }
  })
  .then((comments) => {
    res.send(comments)
  })
  .catch((err) => {
    console.error(err.message);
  })
});

router.post('/', (req, res) => {
  if (!req.session.user || (!req.session.user && req.session.user.permissions.indexOf('comment_add') === -1) ) {
    res.sendStatus(401);
    return;
  }

  Comments.create({
    content: req.body.content,
    authorId: req.body.userId,
    postId: req.body.postId
  })
  .then((comment) => {
    res.send(comment);
  })
  .catch((err) => {
    console.error(err.message);
  })
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
