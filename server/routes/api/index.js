const express = require('express');
const router = express.Router();

const postApi = require('./post');
const userApi = require('./user');

router.use('/posts', postApi);
router.use('/users', userApi);

module.exports = router;