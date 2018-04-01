var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

var x = [], y = []
var num_clients = 0;
io.on('connection', function(socket){
    let cid = num_clients++, x_ = Math.random()*800, y_ = Math.random()*600;
    x[cid] = x_;
    y[cid] = y_;
    socket.emit('id', cid, x, y);
    io.emit('coord', cid, x_, y_);
});

http.listen(3000, function(){
    console.log("server started");
});