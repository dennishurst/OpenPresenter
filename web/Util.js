
var fs = require('fs');

exports.fxGetSongs = function() {
    var p = "./root/songs/";
    var songs = [];
    files = fs.readdirSync(p);
    files.forEach(function (file) {
        var sExt = file.substring(file.length - 2, file.length);
        if (sExt === 'js') {
            songs.push(file);
        }
    });
    return songs;
}