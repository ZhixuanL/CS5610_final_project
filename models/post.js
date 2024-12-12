const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;