const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({...req.body, username_id: req.session.user_id });
        res.status(200).json(postData);
      
    } catch (err) {
        res.status(400).json(err);
      }
})

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            });

            if (!updatePost) {
                res.status(404).json({ message: 'No post found with that ID' });
                return;
              }
              res.status(200).json('Post has been updated');
    } catch (err) {
        res.status(400).json(err);
      }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy(req.body,
            {
                where: {
                    id: req.params.id
                }
            });

            if (!deletePost) {
                res.status(404).json({ message: 'No post found with that ID' });
                return;
              }
              res.status(200).json('Post has been deleted');
    } catch (err) {
        res.status(400).json(err);
      }
})



module.exports = router