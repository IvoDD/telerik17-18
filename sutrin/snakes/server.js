var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

var numClients = 0;
var foodX = Math.floor(Math.random()*30), foodY = Math.floor(Math.random()*30);
io.on('connection', function(socket){
    let cid = numClients++;
    let snakeX = [2, 1, 0], snakeY = [20, 20, 20];
    socket.emit('id', cid, snakeX, snakeY);
    socket.emit('food', foodX, foodY);
    socket.on('eat', function(){
        foodX = Math.floor(Math.random()*30);
        foodY = Math.floor(Math.random()*30);
        io.emit('food', foodX, foodY)
    });
    socket.on('snakeMove', function(x, y){
       socket.broadcast.emit('snakeMove2', cid, x, y); 
    });
});

http.listen(3000, function(){
    console.log("server started");
});