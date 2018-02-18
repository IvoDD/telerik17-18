var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});
app.get('/hi', function(req, res){
    res.send("hello world");
});


io.on('connection', function(socket){
    console.log("niakoi se svurza");
    socket.on("msg", function(data){
        io.emit("msg", data);
    });
});

http.listen(3000, function(){
    console.log("server started");
});