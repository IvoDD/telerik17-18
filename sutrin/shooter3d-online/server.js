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

var b = [];
var db = []
var pl = [];
var numpl = 0;
var vel = 2;
io.on('connection', function(socket){
    let cid=numpl++;
    pl.push({x: Math.random()*1000-500, y: 0, z: Math.random()*1000-500, alpha: 0, beta: 0, dead: false});
    socket.emit('init', cid, pl);
    socket.broadcast.emit('newpl', cid, pl[cid]);
    socket.on('mv', function(x, y, z, alpha, beta){
        pl[cid] = {x: x, y: y, z: z, alpha: alpha, beta: beta};
        socket.broadcast.emit('mv', cid, pl[cid]);
    });
    socket.on('shoot', function(alpha, beta){
        b.push({x: pl[cid].x, y: pl[cid].y, z: pl[cid].z, s: cid});
        db.push({dx: Math.cos(alpha)*Math.cos(beta)*vel, dy: Math.sin(beta)*vel, dz: Math.sin(alpha)*Math.cos(beta)*vel});
    });
});

function update(){
    for (let i=0; i<b.length; ++i){
        b[i].x += db[i].dx;
        b[i].y += db[i].dy;
        b[i].z += db[i].dz;
        if (b[i].x >= 1000 || b[i].x <= -1000 || b[i].y >=100 || b[i].y <=-100 || b[i].z >= 1000 || b[i].z <= -1000){
            b[i] = b[b.length-1];
            db[i] = db[db.length-1];
            b.pop();
            db.pop();
            continue;
        }
        for (let j=0; j<numpl; ++j){
            if (areColliding(b[i].x-0.5, b[i].z-0.5, 1, 1, pl[j].x-1, pl[j].z-1, 2, 2) && b[i].y-0.5 <= pl[j].y + 2 && b[i].y+0.5 >= pl[j].y - 3.5 && b[i].s != j && !pl[j].dead){
                b[i] = b[b.length-1];
                db[i] = db[db.length-1];
                b.pop();
                db.pop();
                pl[j].dead=true;
                io.emit('dead', j);
                break;
            }
        }
    }
    io.emit("b", b);
}
setInterval(update, 10);

http.listen(3000, function(){
    console.log("server started");
});