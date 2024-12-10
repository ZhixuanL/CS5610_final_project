const mongoose = require('mongoose');

// define the schema and model for User
const userSchema = new mongoose.Schema({
    username: {type: String, required:true },
    email: {type: String, required:true},
    registeredAt: {type:Date, default:Date.now}
});

const User = mongoose.model("User", userSchema);

module.exports = User;