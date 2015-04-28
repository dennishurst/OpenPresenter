console.log("Script Pre-Loaded");

fs = require("fs");

console.log("Script Loaded");

fs.readFile('./derp.txt', 'UTF-8' , function (err,data) {
	if (err) throw err;
	console.log(data);
	console.log("Script Complete");
});
