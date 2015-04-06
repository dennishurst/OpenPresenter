var domain = require('domain');
var d = domain.create();



var http = require("http")
var url = require("url")
var path = require("path")
var fs = require("fs")
var port = process.argv[2] || 8888;


d.on('error', function(err) {
  console.error(err);
});




d.run(function() {
http.createServer(function(request, response) {

	var uri = url.parse(request.url).pathname
	console.log('URL:%s\r\n', uri);
	var filename = path.join(process.cwd(), uri);
	fs.exists(filename, function(exists) {
		if(!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
			return;
		}

		if (fs.statSync(filename).isDirectory()) filename += '/index.html';

		fs.readFile(filename,  function(err, file) {
			if(err) {
				throw err;
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n" );
				response.end();
				return;
			}

			var extname = path.extname(filename);

			if (extname === '.css')
			{
				response.writeHead(200, {"Content-Type": "text/css; charset=UTF-8"});				
			}
			else if (extname === '.js'){
				response.writeHead(200, {"Content-Type": "text/javascript; charset=UTF-8"});				
			}
			else {
				response.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
			}
			//console.log("extname:" + extname);

			
			response.write(file, "binary");
			response.end();
		});
	});
}).listen(parseInt(port, 10));
});
console.log("Static file server running at\n => http://localhost:" + port + "/\nCTRL + C to shutdown");