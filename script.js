const http = require('http');
const express = require('express');
const app = express();


const hostname = '127.0.0.1';
const port = 3000;

app.get('/players', function(_req,res){
    res.write('Players dummy');
    res.end();
});

const server = http.createServer((_req,res) => {
    res.statusCode = 200;
    res.setHeader ('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Donald's server running at http://${hostname}:${port}/`)
});