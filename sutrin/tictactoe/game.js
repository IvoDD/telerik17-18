// Creating variables
var socket = io();

var colors=['white', 'red', 'blue'];
var id = -1, onturn = 0;

var grid = [];
for (let i=0; i<3; ++i){
    grid[i] = [];
    for (let j=0; j<3; ++j){
        grid[i][j] = 0;
    }
}

socket.on("id", function(cid, turn){
    id = cid;
    onturn = turn;
})
socket.on("change", function(col, x, y, turn){
    grid[x][y] = col;
    onturn = turn;
})

function update() {
    
}

function draw() {
    context.fillStyle = 'black';
    context.fillRect(99, 199, 301, 301);
    for (let i=0; i<3; ++i){
        for (let j=0; j<3; ++j){
            context.fillStyle = colors[grid[i][j]];
            context.fillRect(i*100+100, j*100+200, 99, 99);
        }
    }
}

function keyup(key) {
}
function mouseup() {
    x = Math.floor((mouseX-100)/100);
    y = Math.floor((mouseY-200)/100);
    if (x>=0 && x<3 && y>=0 && y<3 && id%2 == onturn && grid[x][y]==0){
        socket.emit('change', x, y);
    }
}
