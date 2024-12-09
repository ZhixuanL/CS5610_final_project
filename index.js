const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const mongoDB = 'mongodb+srv://zhixuanl0805:Aji3PmmC46yf4f5I@finalproject.lb9la.mongodb.net/?retryWrites=true&w=majority&appName=FinalProject'

// connect to MongoDB
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MongoDB connected")
})
.catch(err => {
    console.log(err)
});

app.get('/', (req,res) => {
    res.send('Hello,world!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});