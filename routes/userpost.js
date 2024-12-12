const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

// method to create new posts
router.post('/', async (req,res) => {
    const {content} = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const newPost = new Post({
            userId,
            content,
            timestamp: new Date()
        });
        await newPost.save();

        res.status(201).json({ message: 'Post created successfully!', post: newPost });
    } catch(err) {
        res.status(500).json({ message: 'Error creating post: ' + err.message });
    }
});


// method to display posts by userId
router.get('/', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        const posts = await Post.find({userId}).sort({timestamp:-1});

        if(!posts) {
            return res.status(404).json({ message: 'No posts found for this user!' });
        }

        res.json({
            success: true,
            posts: posts
        });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving posts: ' + err.message });
    }
});


// method to update post
router.put('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const {content} = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({ message: 'Post not found!' });
        }
        if (post.userId.toString() !== userId) {
            return res.status(403).json( {message: 'Not authorized to update!'} );
        }

        post.content = content;
        await post.save();
        res.status(200).json({ message: 'Post updated successfully!', post });
    } catch(err) {
        res.status(500).json({ message: 'Error updating post: ' + err.message});
    }
});


// method to delete post
router.delete('/:postId', async (req, res) => {
    const { postId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({ message: 'Post not found!' });
        }

        if (post.userId.toString() !== userId) {
            return res.status(403).json( {message: 'Not authorized to update!'} );
        }

        await Post.deleteOne({ _id: postId });
        res.status(200).json({ message: 'Post deleted successfully!', post });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting post: ' + err.message});
    }
});


module.exports = router;
