const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;
const mongoDB = 'mongodb+srv://zhixuanl0805:Aji3PmmC46yf4f5I@finalproject.lb9la.mongodb.net/?retryWrites=true&w=majority&appName=FinalProject'
const path = require('path');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const userpageRouter = require('./routes/userpage');
const userpostRouter = require('./routes/userpost');
const allpostsRouter = require('./routes/allposts');


// connect to MongoDB
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MongoDB connected")
})
.catch(err => {
    console.log(err)
});

// parse JSON data submitted by frontend users
app.use(express.json());

// serve static files from the public directory
app.use(express.static('public'));

// use registerRouter for the /register route
app.use('/register', registerRouter);

// use loginRouter for the /login route
app.use('/login', loginRouter);

app.use('/userpage', userpageRouter);

app.use('/userpost', userpostRouter);

app.use('/allposts', allpostsRouter);

// home page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// import path to remove .html suffix in URL
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/userpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'userpage.html'));
});

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});