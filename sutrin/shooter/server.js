var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function(req, res){ //не пипай това, не ти трябва да знаеш какво прави
    res.sendFile(__dirname + "/game.js");
}); 

var myX = [], myY = [], hp = [];
var bX = [], bY = [], dx = [], dy = []; //koi e izstrelial patrona
var isConnected = [];
var numClients = 0;

io.on('connection', function(socket){
    let id = numClients++;
    myX[id] = Math.random()*800;
    myY[id] = Math.random()*600;
    hp[id] = 50;
    socket.emit('init', id, myX, myY, hp, bX, bY);
    io.emit('move', id, myX[id], myY[id]);
    
    
    socket.on('ml', function(){
        myX[id] -= 3;
        io.emit('move', id, myX[id], myY[id]);
    });
    socket.on('mr', function(){
        myX[id] += 3;
        io.emit('move', id, myX[id], myY[id]);
    });
    socket.on('mu', function(){
        myY[id] -= 3;
        io.emit('move', id, myX[id], myY[id]);
    });
    socket.on('md', function(){
        myY[id] += 3;
        io.emit('move', id, myX[id], myY[id]);
    });
    socket.on('shoot', function(targetX, targetY){
        bX.push(myX[id]);
        bY.push(myY[id]);
        let dist = Math.sqrt((targetX - myX[id])*(targetX - myX[id]) + (targetY - myY[id])*(targetY - myY[id]));
        dx.push((targetX-myX[id])/dist*10);
        dy.push((targetY-myY[id])/dist*10);
    });
    socket.on('disconnect', function(){
        isConnected[id] = 0;
        io.emit("toia se umria", id);
    })
    
});
    
function update(){
    for (let i=0; i<bX.length; ++i){
        bX[i] += dx[i];
        bY[i] += dy[i];
    }
    io.emit('b', bX, bY);
    //send info
    //console.log("update");
}
setInterval(update, 10);

http.listen(3000, function(){
    console.log("server started");
});