const express = require('express');
const router = express.Router();

const { Post, User } = require('./index');

// get all of posts from database
router.get('/posts', (req, res) => {
  Post.findAll()
  .then(res.send)
  .catch(console.error);
});

// get one post from database
router.get('/posts/:postId', (req, res) => {
  Post.findById(req.body.id)
  .then(res.send)
  .catch(console.error);
});

// create one post in database
router.post('/posts/:postId', (req, res) => {
  Post.create(req.body)
  .then(res.send)
  .catch(console.error);
});

// update one post in database
router.put('/posts/:postId', (req, res) => {
  Post.update(req.body)
  .then(res.send)
  .catch(console.error);
});

// delete one post from database
router.delete('/posts/:postId'), (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(res.send)
  .catch(console.error);
}

module.exports = router;