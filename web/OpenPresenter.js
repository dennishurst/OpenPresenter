var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var url = require('url');

var fs = require('fs');

var util = require('./Util.js');


var sTSettings = fs.readFileSync("settings.json");
var oSettings = JSON.parse(sTSettings);
console.log("currentService:" + oSettings.currentService_id);

console.log("Starting program, now let's load a handler.");

app.get('/*', function (req, res) {
    var sFile = req.originalUrl;
    sFile = sFile.substring(2, sFile.length);

    if (sFile.length === 0)
    {
        sFile = "index.html";
    }
    console.log(sFile);
    
    res.sendFile(sFile,
        {
            maxAge: 1,    // 24* 60* 60* 1000, 
            root: './root/'
        },
        function (err) {
            if (err) {
                console.log("Error serving:" + sFile);
                res.status(err.status).end();
            }
            else {
                console.log(" Success");
            }
        });
});
console.log("ChkPnt1")

app.get('/api/*', function (req, res) {
    var myObj = {
        FirstName: "Dennis",
        LastName: "Hurst",
        "Courses": [{ "Class": "CS", "Grade": "A" }, { "Class": "English", "Grade": "C" }]

    };

    app.set('json_spaces', 4);
    res.json(myObj);



});
console.log("ChkPnt2")

