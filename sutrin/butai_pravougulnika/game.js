// Creating variables
var socket = io();
var myX=0, myY=0;

socket.on('move', function(d){
    if (d==87){myY -= 5;}
    if (d==83){myY += 5;}
    if (d==65){myX -= 5;}
    if (d==68){myX += 5;}
})

function update() {
    if (isKeyPressed[87]){socket.emit("move", 87);}
    if (isKeyPressed[83]){socket.emit("move", 83);}
    if (isKeyPressed[65]){socket.emit("move", 65);}
    if (isKeyPressed[68]){socket.emit("move", 68);}
}

function draw() {
    context.fillRect(myX, myY, 30, 30);
}

function keyup(key) {
    console.log(key);
}
function mouseup() {
    
}
