const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

// router.get('/', function(req, res) {

// });

module.exports = router;