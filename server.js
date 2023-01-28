/* import all modules first */ 
const http = require('http'),
fs = require('fs'),
url = require('url');

/* creating use of server and requests */
http.createServer((request, response) => {
  let addr = request.url,
    q = url.parse(addr, true),
  /* empty file path, will be defined in if else statement that follows */
    filePath = '';

/* file system module appends data from URL usage to log.txt file */
fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Added to log.');
  }
});

/* defines filepath based on if else statement */
if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

/* file system function reads file and stops code if error is returned */
  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

/* listens to user activity via port 8080 */
}).listen(8080);
console.log('My test server is running on Port 8080.');