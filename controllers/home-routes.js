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
        console.log(posts);
        res.render('homepage', {
            posts,
            // This will determine ig Login or Logout will show on page
        loggedIn: req.session.loggedIn
    });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userPosts = await User.findByPk(1,{
            attributes: { exclude: ['password'] },
            include: [{model: Post}],
        });


        const posts = userPosts.get({ plain: true });
console.log(posts);
        res.render('dashboard', posts);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;