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
    host: 'toradb.chjdbwlzo4nc.us-west-2.rds.amazonaws.com',
    user: 'razrog',
    password: '1qaz!QAZ',
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
        results.map(lesson => {
            let lessonType = lesson.type;
            let pathToFile = resolvePathToFile(lesson.pathToFile, lessonType);
            lesson.pathToFile = pathToFile;
            console.log(pathToFile)
        });
        lessons = results;
        res.send(results);
    });
};

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

const resolvePathToFile = (pathToFile, lessonType) => {
    if (pathToFile.startsWith("/public")) {
        return pathToFile.split("/public")[1];
    } else if (pathToFile.startsWith("/music")) {
        return pathToFile;
    } else {
        return getPathFromLessonType(lessonType) + pathToFile;
    }
};

const getPathFromLessonType = (lessonType) => {
    switch (lessonType) {
        case "gmara":
        case "GMARA":
            return "/music/MP3/Gmara/";

        case "halachot":
        case "HALACHOT":
            return "/music/MP3/HalahotShabat/";

        case "avot":
        case "AVOT":
            return "/music/MP3/PerkeyAvot/";

        case "parasha":
        case "PARASHA":
            return "/music/MP3/Parashot/";

        case "moed":
        case "MOED":
            return "/music/MP3/Moed/";

        case "musar":
        case "MUSAR":
            return "/music/MP3/Musar/";
    }
};