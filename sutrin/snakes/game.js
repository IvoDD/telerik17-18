var socket = io();

var colors = ['red', 'green', 'blue', 'yellow'];
var snakeX = [];
var snakeY = [];
var lastDir = 68;
var t = 0;
var id = -1;
var foodX=-1, foodY=-1;

socket.on('id', function(cid, x, y){
    id = cid;
    snakeX[id] = x;
    snakeY[id] = y;
});
socket.on('food', function(x, y){
    foodX = x;
    foodY = y;
})

socket.on('snakeMove2', function(cid, x, y){
    snakeX[cid] = x;
    snakeY[cid] = y;
});

function update() {
    if (id == -1){return;}
    if (t>=20){
        let tailX = snakeX[id][snakeX[id].length-1], tailY = snakeY[id][snakeY[id].length-1];
        for (let i = snakeX[id].length-1; i>0; --i){
            snakeX[id][i] = snakeX[id][i-1];
            snakeY[id][i] = snakeY[id][i-1];
        }
        if (lastDir == 87){--snakeY[id][0];}
        if (lastDir == 83){++snakeY[id][0];}
        if (lastDir == 65){--snakeX[id][0];}
        if (lastDir == 68){++snakeX[id][0];}
        if (snakeX[id][0] == foodX && snakeY[id][0] == foodY){
            snakeX[id].push(tailX);
            snakeY[id].push(tailY);
            socket.emit('eat');
        }
        socket.emit('snakeMove', snakeX[id], snakeY[id]);
        t = 0;
    }
    ++t;
}

function draw() {
    for (let i=0; i<snakeX.length; ++i){
        context.fillStyle = colors[i%colors.length];
        if (snakeX[i] == undefined){continue;}
        for (let j=0; j<snakeX[i].length; ++j){
            context.fillRect(snakeX[i][j]*20, snakeY[i][j]*20, 19, 19);
        }
    }
    context.fillStyle = 'purple';
    context.fillRect(foodX*20, foodY*20, 19, 19);
}

function keyup(key) {
	lastDir = key;
}
function mouseup() {
    
}
