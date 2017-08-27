const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/admin', (req,res) => {
    res.render('admin');
});

// router.get('/', (req,res) => {
//     res.render('index');
// });

module.exports = router;