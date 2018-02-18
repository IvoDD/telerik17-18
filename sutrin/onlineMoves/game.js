var socket = io();
var id = -1;
var x = [], y = [], s = [], dead = [];

socket.on('id', function(a){
    id = a;
    x[id] = 0; y[id] = 0; s[id] = Math.random()*20+10;
    console.log("My id is ", id);
});
socket.on('move', function(idm, xm, ym, sm){
    x[idm] = xm;
    y[idm] = ym;
    s[idm] = sm;
});
socket.on('died', function(i){
    dead[i] = true;
})

function update() {
    if (id == -1){return;}
    if (isKeyPressed[87]){y[id] -= 50/s[id];}
    if (isKeyPressed[83]){y[id] += 50/s[id];}
    if (isKeyPressed[65]){x[id] -= 50/s[id];}
    if (isKeyPressed[68]){x[id] += 50/s[id];}
    for (let i=0; i<x.length; ++i){
        if (i != id && areColliding(x[id], y[id], s[id], s[id], x[i], y[i], s[i], s[i]) && s[id] > s[i] && !dead[i]){
            s[id]+=s[i];
            dead[i] = true;
            socket.emit("died", i);
        }
    }
    socket.emit('move', x[id], y[id], s[id]);
}

function draw() {
    if (id == -1){
        context.font = "Arial 50px";
        context.fillText("Loading...", 100, 100);
        return;
    }
    for (let i=0; i<x.length; ++i){
        if (i == id){context.fillStyle = 'red';}
        else{context.fillStyle = 'blue';}
        if (!dead[i]){context.fillRect(x[i], y[i], s[i], s[i]);}
    }
}

function keyup(key) {
	console.log(key);
}
function mouseup() {
    
}
