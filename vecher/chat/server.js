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
    ++numClients;
    console.log("number of clients is:", numClients);
    io.emit("number", numClients);
});

http.listen(3000, function(){
    console.log("server started");
});