const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({...req.body, username_id: req.session.user_id });
        res.status(200).json(postData);
      
    } catch (err) {
        res.status(400).json(err);
      }
})

router.put('/', async (req, res) => {
    try {
        
    } catch (err) {
        res.status(400).json(err);
      }
})

router.delete('/', async (req, res) => {
    try {
        
    } catch (err) {
        res.status(400).json(err);
      }
})



module.exports = router