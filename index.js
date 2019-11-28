const express = require('express');
const path = require('path');
const lessons = require('./lessons');

const app = express();

const lessonsCache = [];

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));
app.use(express.static(path.join(__dirname, '/PUB')));


const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);


// Select posts
app.get('/api/lessons/getAll', (req, res) => {
    if (lessonsCache.length === 0) {
        fetchFromDb(req, res);
    } else {
        console.log("fetching from cache");
        res.send(lessons);
    }
});


// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

const fetchFromDb = (req, res) => {
    console.log("Fetching lessons from internal DB");
    lessons.getAllLessons(req,res);
};

