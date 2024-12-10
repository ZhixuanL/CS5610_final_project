const express = require('express');
const router = express.Router();
const User = require('../models/user');

// route to handle user registration
router.post('/', (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).send('Username and email are required.');
    }
    const newUser = new User({ username, email });
    newUser.save()
    .then(()=>{
        res.status(201).send('User registered successfully!');
    })
    .catch(err => {
        res.status(400).send('Error: '+err);
    });
});

module.exports = router;