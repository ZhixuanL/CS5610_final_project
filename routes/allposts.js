const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async(req, res) => {
    try{
        const posts = await Post.find().populate('userId', 'username');
        res.json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fecthing posts!' });
    }
});


module.exports = router;