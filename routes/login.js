const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try{
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({ success: false, message:'User not found.'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).json({ success: false, message:'Incorrect password!' });
        }

        const token = jwt.sign(
            { userId: user._id}, 
            JWT_SECRET, 
            { expiresIn: '1h'}
        );

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            token: token
        });
    } catch(error) {
        res.status(500).json({ success:false, message:'Server error: '+error.message});
    }
});

module.exports = router;