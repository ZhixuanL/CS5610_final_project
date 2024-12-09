const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const mongoDB = 'mongodb+srv://zhixuanl0805:Aji3PmmC46yf4f5I@finalproject.lb9la.mongodb.net/?retryWrites=true&w=majority&appName=FinalProject'

// parse JSON data submitted by frontend users
app.use(express.json());

// connect to MongoDB
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MongoDB connected")
})
.catch(err => {
    console.log(err)
});

// define the schema and model for User
const userSchema = new mongoose.Schema({
    username: {type: String, required:true },
    email: {type: String, required:true},
    registeredAt: {type:Date, default:Date.now}
});

const User = mongoose.model("User", userSchema);



app.get('/', (req,res) => {
    res.send('Hello,world!');
});

// route to handle user registration
app.post('/register', (req, res) => {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    newUser.save()
    .then(()=>{
        res.status(201).send('User registered successfully!');
    })
    .catch(err => {
        res.status(400).send('Error: '+err);
    });
});

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});