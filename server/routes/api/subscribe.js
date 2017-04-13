const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  Post.create({
    email: req.body.email
  })
  .then((subscriber) => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.error(err.message);
  });
});

module.exports = router;
