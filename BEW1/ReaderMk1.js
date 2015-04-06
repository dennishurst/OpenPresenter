console.log("Script Pre-Loaded")

fs = require("fs");

console.log("Script Loaded");

fs.readFile('./derp.txt'), function (err,data) {
	if (err) throw err;
	console.log(data);
}
/*
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8080);
*/
