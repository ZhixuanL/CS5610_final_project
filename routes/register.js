const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

// route to handle user registration
// use async and await to handle asynchronous operations(password hashing)
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username, email, and password are required.' });
    }

    try{
        // encrypt the password using bcrypt with the specified salt rounds
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ 
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully!' });
    } catch(err) {
        res.status(500).json({ success: false, message: 'Error: ' + err });
    }
});

module.exports = router;