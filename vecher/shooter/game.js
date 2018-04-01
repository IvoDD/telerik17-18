// Creating variables
var socket = io();

var bX = [], bY = [], bId = [];
var x = [], y = [];
var id = -1;
var isConnected = [];

socket.on('id', function(cid, x_, y_){
    id = cid;
    x = x_;
    y = y_;
});

socket.on('coord', function(id_, x_, y_){
    x[id_] = x_;
    y[id_] = y_;
});

socket.on('bul', function(bX_, bY_, bId_){
    bX = bX_;
    bY = bY_;
    bId = bId_;
});
socket.on('conn', function(isConnected_){
    isConnected = isConnected_;
})

function update() {
    if (!isConnected[id]) return;
    let haveMoved = 0;
    if (isKeyPressed[87]){y[id]-=5; haveMoved=1;}
    if (isKeyPressed[83]){y[id]+=5; haveMoved=1;}
    if (isKeyPressed[65]){x[id]-=5; haveMoved=1;}
    if (isKeyPressed[68]){x[id]+=5; haveMoved=1;}
    if (haveMoved){
        socket.emit('move', id, x[id], y[id]);
    }
}

function draw() {
    for (let i=0; i<x.length; ++i){
        if (!isConnected[i]) continue;
        if (i == id){context.fillStyle = 'red';}
        else{context.fillStyle = 'blue';}
        context.fillRect(x[i], y[i], 30, 30);
    }
    for (let i=0; i<bX.length; ++i){
        if (bId[i] == id) context.fillStyle = 'red';
        else context.fillStyle = 'blue';
        context.fillRect(bX[i], bY[i], 10, 10);
    }
}

function keyup(key) {
	
}
function mouseup() {
    if (!isConnected[id]) return;
    socket.emit('shoot', mouseX, mouseY);
}
