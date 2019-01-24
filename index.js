const express = require('express');
const path = require('path');
const url = require('url');
const proxy = require('express-http-proxy');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));


const apiProxy = proxy('localhost:5000/api', {
    proxyReqPathResolver: req => url.parse(req.baseUrl).path
});

app.use('/api/**', apiProxy);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const port = process.env.PORT || 80;
app.listen(port);

console.log('App is listening on port ' + port);