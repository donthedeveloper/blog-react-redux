const express = require('express');
const router = express.Router();

const { User } = require('../../models');

router.get('/', (req, res) => {
  User.findAll()
  .then(res.send)
  .catch(console.error)
});

router.get('/:userId', (req, res) => {
  User.findById(req.params.id)
  .then(res.send)
  .catch(console.error);
});

router.post('/', (req, res) => {
  User.create(req.body)
  .then(res.send)
  .catch(console.error)
});

router.put('/:userId', (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(res.send)
  .catch(console.error);
});

router.delete('/:userId', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(res.send)
  .catch(console.error);
});

module.exports = router;