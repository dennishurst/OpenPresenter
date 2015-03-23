
fs = require('fs');




var sScene = {
    "_id": "1",
    "dataType": "Scene",
    "description": "Act 2, Scene 2: Capulet's orchard.",
    "act": 1,
    "lines": [
      {
          "role": "",
          "stageDirection": "Enter ROMEO",
          "line": ""
      }
    ]
};



var aLines = fs.readFileSync('./SamplePlay.txt').toString().split("\n");

sScene.description = aLines[0];

var sRole = "";
var bNextIsRole = false;
for (var i = 0; i < aLines.length; i++) {
    
    if (bNextIsRole && aLines[0].trim().length > 0){
        sRole = aLines[0];
    }
    else if (aLines[0].trim().length === 0){
        bNextIsRole = true;
    }
}



ROMEO
[Enter ROMEO] 

ROMEO
He jests at scars that never felt a wound.

ROMEO
[JULIET appears above at a window]
But, soft! what light through yonder window breaks?
It is the east, and Juliet is the sun.





