const express = require('express');
const path = require('path');
const url = require('url');
const proxy = require('express-http-proxy');
const mysql = require('mysql')

const app = express();

var lessons = [];

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));


// const apiProxy = proxy('localhost:5000/api', {
//     proxyReqPathResolver: req => url.parse(req.baseUrl).path
// });

// app.use('/api/**', apiProxy);


const port = process.env.PORT || 80;
app.listen(port);

console.log('App is listening on port ' + port);


// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lessons'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

// Select posts
app.get('/api/lessons/getAll', (req, res) => {
    if (lessons.length === 0) {
        fetchFromDb(req, res);
    }
    else {
        console.log("fetching from cache");
        res.send(lessons);
    }
});


const fetchFromDb = (req, res) => {
    console.log("Fetching lessons from DB");
    let sql = 'SELECT * FROM lessons';
    db.query(sql, (err, results) => {
        if (err) throw err;
        lessons = results;
        res.send(results);
    });
};

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});
