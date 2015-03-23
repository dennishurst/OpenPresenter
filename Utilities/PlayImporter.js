
fs = require('fs');




var oScene = {
    "_id": "1",
    "dataType": "Scene",
    "description": "Act 2, Scene 2: Capulet's orchard.",
    "act": 1,
    "lines": [
      
    ]
};



var aLines = fs.readFileSync('./SamplePlay.txt').toString().split("\n");

oScene.description = aLines[0];

var sRole = "";
var bNextIsRole = false;
var oCurrentLine = {
    "role": "",
    "stageDirection": "",
    "line": ""
}

for (var i = 0; i < aLines.length; i++) {
    
    if (bNextIsRole && aLines[0].trim().length > 0){
        //Create a new line
        oCurrentLine = {
            "role": aLines[i],
            "stageDirection": "",
            "line": ""
        }        
        
        bNextIsRole = false;
    }
    else if (aLines[i].trim().length === 0){
        bNextIsRole = true;

        if (i != 0) {
            oScene.lines.push(oCurrentLine);
        }

    }
    else if (aLines[i].substring(0,1) === '[')
    {
        //console.log('Direction found:' + aLines[i])
        oCurrentLine.stageDirection = aLines[i];
    }
    else {
        oCurrentLine.line += aLines[i] + "<br />";
    }
}


console.log("Des:" + oScene.description);

for (var i = 0; i < oScene.lines.length; i++) {

    console.log('role: ' + oScene.lines[i].role + "\n");
    console.log('stateDirection:' + oScene.lines[i].stageDirection)
    console.log('line:' + oScene.lines[i].line);
}



