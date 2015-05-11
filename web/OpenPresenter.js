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
    sFile = sFile.substring(1, sFile.length);

    if (sFile.length === 0) {
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
console.log("ChkPnt1");

app.get('/api/*', function (req, res) {
    var myObj = {
        FirstName: "Dennis",
        LastName: "Hurst",
        "Courses": [{ "Class": "CS", "Grade": "A" }, { "Class": "English", "Grade": "C" }]

    };

    app.set('json_spaces', 4);
    res.json(myObj);



});

app.get('/user/:userid', function (req, res) {
    console.log(" URL:\t " + req.originalUrl);
    console.log(" Protocol: " + req.protocol);
    console.log(" IP:\t " + req.ip);
    console.log(" Path:\t " + req.path);
    console.log(" Host:\t " + req.host);
    console.log(" Method:\t " + req.method);
    console.log(" Query:\t " + JSON.stringify(req.query));
    console.log(" Fresh:\t " + req.fresh);
    console.log(" Stale:\t " + req.stale);
    console.log(" Secure:\t " + req.secure);
    console.log(" UTF8:\t " + req.acceptsCharset(' utf8'));
    console.log(" Connection: " + req.get(' connection'));
    console.log(" Headers: " + JSON.stringify(req.headers, null, 2));

    var sT = req.originalUrl.substring(0, 5);
    sT = req.param("userid");
    res.send(sT);
});

app.get('/songs/*', function (req, res) {
    var sFile = req.originalUrl;
    sFile = sFile.substring(7, sFile.length);

    if (sFile.length === 0) {
        sFile = util.fxGetSongs();
        app.set('json_spaces', 4);
        res.json(sFile);
        return;
    }


    res.sendFile(sFile,
        {
            maxAge: 1,    // 24* 60* 60* 1000, 
            root: './root/songs/',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }

        },
        function (err) {
            if (err) {
                console.log("Error serving:" + sFile);
                console.log(err);
                res.status(err.status).end();
            }
            else {
                console.log(" Success");
            }
        });
});

io.on('connection', function (socket) {

    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });

    socket.on('message', function (msg) {
        console.log("someone sent:" + msg);
        io.emit('message', msg);
    });
});


http.listen(8080, function () {
    console.log('listening on http://127.0.0.1:8080');
});





/*files.map(function (file) {
    return path.join(p, file);
}).filter(function (file) {
    return fs.statSync(file).isFile();
}).forEach(function (file) {
    console.log("%s (%s)", file, path.extname(file));
});

*/



console.log("ChkPnt2");

