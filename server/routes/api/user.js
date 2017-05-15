const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const { User } = require('../../models');

// get all users from database
  // get users email (admin)
// router.get('/', (req, res) => {
//   User.findAll()
//   .then(res.send)
//   .catch(console.error)
// });

// get user from database
  // get users email (admin)

// router.get('/:userId', (req, res) => {
//   User.findById(req.params.id)
//   .then(res.send)
//   .catch(console.error);
// });

// create user in database
router.post('/', (req, res) => {
  User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      roleId: 1
    }
  })
  .then((user) => {
    const wasCreated = user[1];

    if (wasCreated) {
      res.sendStatus(200);
    } else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    res.sendStatus(406);
  })
});

// edit user in database ( admin or user(own) )
// router.put('/:userId', (req, res) => {
//   User.update(req.body, {
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(res.send)
//   .catch(console.error);
// });

// delete user in database ( admin or user(own) )
// router.delete('/:userId', (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//   .then(res.send)
//   .catch(console.error);
// });

module.exports = router;
