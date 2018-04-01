var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function(req, res){
    res.sendFile(__dirname + "/game.js");
});

var bX = [], bY = [], bId = []; 
var dx = [], dy = [];
var x = [], y = []
var num_clients = 0;
var vel = 10;
io.on('connection', function(socket){
    let cid = num_clients++, x_ = Math.random()*800, y_ = Math.random()*600;
    x[cid] = x_;
    y[cid] = y_;
    socket.emit('id', cid, x, y);
    io.emit('coord', cid, x_, y_);
    socket.on('move', function(id, x1, y1){
        x[id] = x1;
        y[id] = y1;
        io.emit('coord', id, x1, y1);
    });
    socket.on('disconnect', function(){
        x[cid] = -100;
        y[cid] = -100;
        io.emit('coord', cid, -100, -100);
    });
    socket.on('shoot', function(tX, tY){
        bX.push(x[cid]);
        bY.push(y[cid]);
        bId.push(cid);
        let dist = Math.sqrt((tX - x[cid])*(tX - x[cid]) + (tY - y[cid])*(tY - y[cid]));
        dx.push((tX-x[cid])*vel/dist);
        dy.push((tY-y[cid])*vel/dist);
    })
});

function areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
	if (Bx <= Ax + Awidth) {
		if (Ax <= Bx + Bwidth) {
			if (By <= Ay + Aheight) {
				if (Ay <= By + Bheight) {
					return 1;
				}
			}
		}
	}
	return 0;
}

function upd(){
    for (let i=0; i<bX.length; ++i){
        bX[i] += dx[i];
        bY[i] += dy[i];
        if (bX[i] < -10 || bX[i] > 790 || bY[i] < -10 || bY[i] > 590){
            bX[i] = bX[bX.length-1]; bX.pop();
            bY[i] = bY[bY.length-1]; bY.pop();
            bId[i] = bId[bId.length-1]; bId.pop();
            dx[i] = dx[dx.length-1]; dx.pop();
            dy[i] = dy[dy.length-1]; dy.pop();
            --i;
        }
        for (let j=0; j<x.length; ++j){
            if (j!=bId[i] && areColliding(bX[i], bY[i], 10, 10, x[j], y[j], 30, 30)){
                x[j] = -100000000;
                y[j] = -100000000;
                io.emit('coord', j, x[j], y[j]);
                bX[i] = bX[bX.length-1]; bX.pop();
                bY[i] = bY[bY.length-1]; bY.pop();
                bId[i] = bId[bId.length-1]; bId.pop();
                dx[i] = dx[dx.length-1]; dx.pop();
                dy[i] = dy[dy.length-1]; dy.pop();
                --i;
                break;
            }
        }
    }
    io.emit('bul', bX, bY, bId);
}
setInterval(upd, 10);

http.listen(3000, function(){
    console.log("server started");
});