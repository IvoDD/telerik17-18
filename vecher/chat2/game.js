// Creating variables
var socket = io();

var msg = [];
var text = "";

socket.on('message', function(message){
    msg.push(message);
})

function update() {
    
}

function draw() {
    context.font = "30px Arial";
    for (let i=0; i<msg.length; ++i){
        context.fillText(msg[i], 0, i*30+100);
    }
    context.fillText(text, 0, msg.length*30+100);
}

function keyup(key) {
	if (key == 13){
        socket.emit("msg", text);
        text = "";
    }else if(key == 8){
        text = "";
    }else{
        text = text + String.fromCharCode(key);
    }
}
function mouseup() {
    
}
