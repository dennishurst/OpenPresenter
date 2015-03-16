//var parseString = require('xml2js').parseString;

var fs = require('fs')
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/StillAlive.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        

    var sResult = JSON.stringify(result);
	fs.writeFile('StillAlive.json', sResult, function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});








        
    });
});