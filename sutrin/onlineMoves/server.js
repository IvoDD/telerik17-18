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
io.on('connection', function(socket){
    let id = numClients++;
    socket.emit('id', id);
    socket.on('move', function(x, y, s){
        io.emit('move', id, x, y, s);
    });
    socket.on('died', function(i){
        io.emit('died', i);
    });
    socket.on('disconnect', function(){
        io.emit('died', id);
    })
});

http.listen(3000, function(){
    console.log("server started");
});