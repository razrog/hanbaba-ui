const express = require('express');
const path = require('path');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

const app = express();

let lessons = [];

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));
app.use(express.static(path.join(__dirname, '/PUB')));
app.use(fileUpload());


const port = process.env.PORT || 8080;
app.listen(port);

console.log('App is listening on port ' + port);


// Create connection
const db = mysql.createConnection({
    host: 'toradb.chjdbwlzo4nc.us-west-2.rds.amazonaws.com',
    user: 'razrog',
    password: '1qaz!QAZ',
    database: 'lessons'

    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'lessons'
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


// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.post('/upload', function (req, res) {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let newLesson = req.files.lesson;
    let fileName = req.fileName;
    let lessonTypePwd = getPathFromLessonType(req.lessonType);
    // newLesson.mv('/home/ec2-user/dev/services/hanbaba/hanbaba-ui/PUB/' + lessonTypePwd + '/' + fileName, function (err) {
    newLesson.mv('./files/' + lessonTypePwd + fileName, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

const fetchFromDb = (req, res) => {
    console.log("Fetching lessons from DB");
    let sql = 'SELECT * FROM lessons';
    db.query(sql, (err, results) => {
        if (err) throw err;
        results.map(lesson => {
            let lessonType = lesson.type;
            lesson.pathToFile = resolvePathToFile(lesson.pathToFile, lessonType);
        });
        lessons = results;
        res.send(results);
    });
};

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