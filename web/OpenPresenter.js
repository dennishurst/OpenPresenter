var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var url = require('url');

var fs = require('fs');

var sTSettings = fs.readFileSync("settings.json");
var oSettings = JSON.parse(sTSettings);
console.log("currentService:" + oSettings.currentService_id);





app.get('/user/:userid', function (req, res) {
    console.log(" URL:\t " + req.originalUrl);
    console.log(" Protocol: " + req.protocol);
    console.log(" IP:\t " + req.ip);
    console.log(" Path:\t " + req.path);
    console.log(" Host:\t " + req.host);
    console.log(" Method:\t " + req.method);
    console.log(" Query:\t " + JSON.stringify( req.query));
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


app.get('/*', function (req, res) {
    var sFile = req.originalUrl;
    sFile = sFile.substring(1, sFile.length);

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
    console.log('listening on *:8080');
});







