const express = require('express');
const router = express.Router();
const User = require('../models/user');

// route to handle user registration
router.post('/', (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).json({ success: false, message: 'Username and email are required.' });
    }
    const newUser = new User({ username, email });
    newUser.save()
    .then(()=>{
        res.status(201).json({ success: true, message: 'User registered successfully!' });
    })
    .catch(err => {
        res.status(400).json({ success: false, message: 'Error: ' + err });
    });
});

module.exports = router;