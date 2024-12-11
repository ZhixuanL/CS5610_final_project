const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

router.get('/', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized!'});
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message: 'User not found!'});
        }

        res.json({
            success:true,
            message:'User data retrieved successfully!',
            data: {
                username: user.username,
                registeredAt: user.registeredAt,
            },
        });
    } catch(err) {
        res.status(403).json({ message: 'Invalid token!' });
    }
});

module.exports = router;