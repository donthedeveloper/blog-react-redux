const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

const {Post} = require('../models');

router.use('/api', apiRouter);

router.get('/', (req,res) => {
    Post.findAll({
        order: [['id', 'ASC']]
    })
    .then((posts) => {
        res.render('index', { posts: posts });
    })
    .catch((err) => {
        console.error(err);
    })
})

router.get('/admin*', (req,res) => {
    res.render('admin');
});

// router.get('/', (req,res) => {
//     res.render('index');
// });

module.exports = router;