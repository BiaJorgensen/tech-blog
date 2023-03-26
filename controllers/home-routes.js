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
            // This will determine if Login or Logout will show on page
        loggedIn: req.session.loggedIn
    });

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


        const posts = userPosts.get({ plain: true });
        console.log(posts);
        res.render('dashboard', {
            ...posts,
            loggedIn: req.session.loggedIn
        }
         );

    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/new-post', withAuth, (req, res) => res.render('newPost', {loggedIn: req.session.loggedIn} ))

router.get('/post/:id', withAuth, async (req, res) => {

    try {
        const onePostData = await Post.findByPk(req.params.id)
        if (!onePostData) {
            res.status(404).json({ message: 'No posts found with that ID'});
          return;
        }
       

        const userPost = onePostData.get({ plain: true})

        if (userPost.username_id == req.session.user_id) {
            res.render('updatePost', {
            ...userPost,
            loggedIn: req.session.loggedIn
        })
        }else {
            res.render('addComment')
        }
    } catch (err) {
        res.status(500).json(err);
    }
    
})



router.get('/signup', (req, res) => req.session.loggedIn ? res.redirect('/') : res.render('signup'))

router.get('/login', (req, res) => req.session.loggedIn ? res.redirect('/') : res.render('login'));

module.exports = router;