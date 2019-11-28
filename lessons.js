const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const LESSONS_DATA = "data";

const getDataFile = () => {
    return LESSONS_DATA;
}

const getAllLessons = (req,res) => {
    let lessons = [];
    fs.readFile(path.join(__dirname, LESSONS_DATA), 'utf8', (err, content) => {
        let lines = content.split("\n");


        lines.map(line => {
            if (!_.isEmpty(line)) {
                let parts = line.split(",");

                let id = parseInt(parts[0]);
                let type = parts[1];
                let name = parts[2];
                let description = parts[3];
                let rabbi = parts[4];
                let dateAdded = parts[5];
                let pathToFile = parts[6];

                pathToFile = resolvePathToFile(pathToFile, type);

                lessons.push({
                    id,
                    type,
                    name,
                    description,
                    rabbi,
                    dateAdded,
                    pathToFile
                })
            }


        });

        console.log(lessons);
        let results = lessons === undefined ? [] : lessons;
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

module.exports = {
    getAllLessons,
    getDataFile,
    resolvePathToFile,
};
