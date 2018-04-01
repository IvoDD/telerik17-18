// Creating variables
var socket = io();

var x = [], y = [];
var id = -1;

/*function f(a, g){
    return a+g(5);
}

console.log( f(3, function(x){return x*x}) );*/

socket.on('id', function(cid, x_, y_){
    id = cid;
    x = x_;
    y = y_;
});

socket.on('coord', function(id_, x_, y_){
    x[id_] = x_;
    y[id_] = y_;
})

function update() {
    
}

function draw() {
    for (let i=0; i<x.length; ++i){
        if (i == id){context.fillStyle = 'red';}
        else{context.fillStyle = 'blue';}
        context.fillRect(x[i], y[i], 30, 30);
    }
}

function keyup(key) {
	
}
function mouseup() {
    
}
