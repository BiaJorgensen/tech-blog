const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });


        const posts = postsData.map((post) => post.get({ plain: true }));

        res.render('homepage', {posts});

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userPosts = await User.findByPk(req.session.user_id,{
            attributes: { exclude: ['password'] },
            include: [{model: Post}],
        });


        const posts = userPosts.map((post) => post.get({ plain: true }));

        res.render('dashboard', {posts});

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;