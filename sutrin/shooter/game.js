// Creating variables
var socket = io();

var myX = [], myY = [], hp = [], bX = [], bY = [];
var id;

socket.on('init', function(id_, myX_, myY_, hp_, bX_, bY_){
    id = id_;
    myX = myX_;
    myY = myY_;
    hp = hp_;
    bX = bX_;
    bY = bY_;
});

socket.on('move', function(id_, x, y){
    myX[id_] = x;
    myY[id_] = y;
});

socket.on('b', function(bX_, bY_){
    bX = bX_;
    bY = bY_;
})

function update() {
    if (isKeyPressed[83]){socket.emit('md');}
    if (isKeyPressed[87]){socket.emit('mu');}
    if (isKeyPressed[65]){socket.emit('ml');}
    if (isKeyPressed[68]){socket.emit('mr');}
}

function draw() {
    for (let i=0; i<myX.length; ++i){
        if (i == id){context.fillStyle = 'red';}
        else{context.fillStyle = 'blue';}
        context.fillRect(myX[i], myY[i], 30, 30);
    }
    for (let i=0; i<bX.length; ++i){
        context.fillStyle = "black";
        context.fillRect(bX[i], bY[i], 10, 10);
    }
}

function keyup(key) {
	
}
function mouseup() {
    socket.emit("shoot", mouseX, mouseY);
}
