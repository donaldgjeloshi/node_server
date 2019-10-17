const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;
const base = 'http://localhost:3000';

// create Server
const server = http.createServer((req, res) => {

    const method = req.method;
    /*
    //url property takes the full url except protocol, hostname and port
    //that's why the url module comes to help
    const currentUrl = req.url;
    */
    const currentUrl = new URL(req.url, base);
    const pathname = currentUrl.pathname;

    if (method === 'GET' && pathname === '/') {
        res.end('Hello World');
    } else if (method === 'GET' && pathname === '/players') {
        res.end('dummy at last\n');
    }
});

server.listen(port, hostname, () => {
    console.log(`Donald's server running at http://${hostname}:${port}/`)
});