// Creating variables
var socket = io();
var name  = "Pesho";

socket.on("msg", function(data){
    console.log(data);
});

function sendMessage(text){
    socket.emit("msg", name + ": " + text);
}

function update() {
    
}

function draw() {
    
}

function keyup(key) {
    
}
function mouseup() {
    
}
