var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

var numc = 0;
var onturn = 0;
io.on('connection', function(socket){
    let cid = numc;
    ++numc;
    socket.emit("id", cid, onturn);
    socket.on("change", function(x, y){
        if (cid%2 == onturn){
            onturn = 1-onturn;
            io.emit("change", cid%2+1, x, y, onturn);
        }
    });
});

http.listen(3000, function(){
    console.log("server started");
});