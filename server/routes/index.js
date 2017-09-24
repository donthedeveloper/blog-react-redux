const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const apiRouter = require('./api');

const {Post} = require('../models');

router.use('/api', apiRouter);

router.get('/', (req,res) => {
    Post.findAll({
        order: [['id', 'ASC']], 
        // attributes: ['title', 'intro_paragraph', 'content', 'slug']
    })
    .then((posts) => {
        console.dir(posts);
        res.render('index', { posts: posts });
    })
    .catch((err) => {
        console.error(err);
    })
});

router.get('/admin*', (req,res) => {
    res.render('admin');
});

router.get('/:postSlug', (req, res) => {
    Post.findOne({
        where: {
            slug: req.params.postSlug
        }
    })
    .then((post) => {
        res.send(post);
    })
    .catch((err) => {
        console.error(err);
    });
});

module.exports = router;