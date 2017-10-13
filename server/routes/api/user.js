const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const {User} = require('../../models');

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
  if (!req.session.user) {
    return res.sendStatus(401);
  }

  if (req.session.user.roleId !== 2) {
    return res.sendStatus(401);
  }

  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!email || !password) {
    res.status(400).send('Please fill out all required fields.');;
    return;
  }

  User.findOrCreate({
    where: {
      email: email
    },
    defaults: {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      roleId: 1
    }
  })
  .then((user) => {
    console.dir(user);
    if (user[1]) {
      res.sendStatus(200);
    } else {
      res.sendStatus(409);
    }
  })
  .catch((err) => {
    res.sendStatus(400);
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
