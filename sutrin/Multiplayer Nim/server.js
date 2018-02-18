var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var maxDuljina = 6;
var duljina = Math.ceil(Math.random() * maxDuljina);
var maxKamunivKupchina = 10;
var pole = [];
var numPlayer = 0;


app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

for ( let x=0; x<duljina; ++x){
    pole[x] =  Math.ceil( Math.random()*maxKamunivKupchina );
}

io.on('connection', function(socket){
    numPlayer++;
    socket.emit("id", numPlayer);
    
    
    socket.emit("pole", pole);
});



http.listen(3000, function(){
    console.log("server started");
});