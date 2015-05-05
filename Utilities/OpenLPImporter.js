
fs = require('fs');


var oVerse = {
      "verseName": "",
      "lines": ""
    }

var oSong = {
  "title": "",
  "author": "",
  "verseOrder": "v1, v2, c1, v3, v4, v5, c2, v6, v7 ",
  "verses": [
    
  ]
}

var sFile = process.argv[2];
if (sFile.length === 0){
  console.log("Pass in a file name");
}

var aLines = fs.readFileSync(__dirname + "\\" + sFile).toString().split("\n");

function fxReadTagValue(sLine, sTag, bUseEndTag){
  var sT = "";
  if (sLine.length > sTag.length ){
    if (sLine.substring(0, sTag.length) === sTag){
      
      if (bUseEndTag){
        sT = sLine.substring(sTag.length, aLines[i].length - sTag.length-2);
      }
      else {
        sT = sLine.substring(sTag.length, aLines[i].length);
      }


      return sT;
    }
  }
  return "";


}


for (var i = 0; i < aLines.length; i++) {
  
  var sT = fxReadTagValue(aLines[i], "<title>", true);
  if (sT.length > 0) { 
    oSong.title = sT;
    console.log('Title:' + oSong.title);
  }

  sT = fxReadTagValue(aLines[i], "<author>", true);
  if (sT.length > 0) { 
    oSong.author = sT;
    console.log("Author:" + oSong.author);
  }

  sT = fxReadTagValue(aLines[i], "<verse name=", false) ;
  if (sT.length > 0){
    oVerse = {
      "verseName": sT,
      "lines": ""
    }
    //oVerse.verseName = sT;
    //console.log("VerseName:" + oVerse.verseName);
  }

  sT = fxReadTagValue(aLines[i], "<lines>", false) ;
  if (sT.length > 0){
    oVerse.lines = sT;
    //console.log("Line:" + oVerse.lines);
    oSong.verses.push(oVerse);
  }


  
}

var data = JSON.stringify(oSong);
fs.writeFile('./outfile.js', data, function (err) {
  if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
  }
  console.log('Song saved successfully.')
});
