var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});
app.get('/three.min.js', function(req, res){ 
    res.sendFile(__dirname + "/three.min.js");
})

var pl = [];
var numpl = 0;
io.on('connection', function(socket){
    let cid = numpl;
    numpl++;
    pl[cid] = {x: Math.random()*1000-500, y: 0, z: Math.random()*1000-500, alpha: Math.random()*2*Math.PI};
    socket.emit('init', cid, pl);
    socket.broadcast.emit('newpl', cid, pl[cid]);
    socket.on('move', function(x, y, z, alpha){
        pl[cid].x = x; 
        pl[cid].y = y; 
        pl[cid].z = z; 
        pl[cid].alpha = alpha;
        socket.broadcast.emit('move', cid, pl[cid]);
    });
    socket.on('disconnect', function(){
        socket.broadcast.emit('neshto')
    });
});

http.listen(3000, function(){
    console.log("server started");
});