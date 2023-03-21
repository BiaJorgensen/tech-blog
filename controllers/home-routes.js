const router = require('express').Router();
const { Post, User } = require('../models');

router.get('./', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });


        const posts = postsData.map((post) => post.get({ plain: true}));

        res.render('homepage', posts);

    } catch (err) {
        res.status(500).json(err);
    }
})