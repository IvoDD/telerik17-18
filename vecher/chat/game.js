// Creating variables
var socket = io();

socket.on("number", function(data){
    console.log(data);
})
socket.on("natisna", function(key){
    console.log(key);
})

function update() {
    
}

function draw() {
    
}

function keyup(key) {
	socket.emit("key", String.fromCharCode(key));
}
function mouseup() {
    
}
