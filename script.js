const http = require("http");
//const url = require("url");
const fs = require("fs");
const querystring = require("querystring");
const readline = require("readline");

const hostname = "127.0.0.1";
const port = 3000;
const base = "http://localhost:3000";

// create Server
const server = http.createServer((req, res) => {
  // method: GET, POST, DELETE and PUT
  const method = req.method;
  const currentUrl = new URL(req.url, base);
  const pathname = currentUrl.pathname;
  //return welcome page
  if (method === "GET" && pathname === "/") {
    fs.readFile("index.html", (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write("Contents not found");
        throw error;
      } else {
        res.writeHead(200);
        res.write(data);
      }
      res.end();
    });
    // display the list
  } else if (method === "GET" && pathname === "/") {
    readInterface.on("line", function(line) {
      console.log(line);
      res.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Players</title>
      </head>
      <body>
          <p>${line}</p>
      </body>
      </html>
      `);
    });
    // parse
  } else if (method === "POST") {
    fs.readFile("create-player.html", (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write("Contents not found");
        throw error;
      } else {
        collectRequestData(req, result => {
          //console.log(result);
          res.write(`Player name ${result.name} added to the file!`);
          res.end();
          // write names to the file players.txt
          fs.appendFile("players.txt", "\n" + result.name, err => {
            if (err) throw err;
            //console.log("Name of player added!");
          });
        });
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Donald's server running at http://${hostname}:${port}/`);
});

function collectRequestData(request, callback) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  if (request.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    request.on("data", chunk => {
      body += chunk.toString(); // convert Buffer to String
    });
    request.on("end", () => {
      callback(querystring.parse(body));
    });
  } else {
    callback(null);
  }
}

const readInterface = readline.createInterface({
  input: fs.createReadStream("players.txt"),
  output: process.stdout,
  console: false
});
