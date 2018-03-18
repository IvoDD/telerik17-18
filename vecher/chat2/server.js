var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

var num = 0;
io.on('connection', function(socket){
    var i = num++;
    console.log("svurza se: ", i);
    socket.on("msg", function(text){
        io.emit("message", "pc" + i + ": " + text);
    });
    
});

http.listen(3000, function(){
    console.log("server started");
});