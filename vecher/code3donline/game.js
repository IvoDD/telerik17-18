// Creating variables
var socket = io();

var canvas = document.getElementsByTagName('canvas')[0];
var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshPhongMaterial({color: 'red'});

class Player{
    constructor(x, y, z, alpha){
        this.o = new THREE.Mesh(geometry, material);
        this.move(x, y, z, alpha);
        scene.add( this.o );
    }
    move(x, y, z, alpha){
        this.o.position.set(x, y, z);
        this.o.rotation.y = -alpha;
    }
};

var id=-1, p=[];

var floorg = new THREE.BoxGeometry(1000, 1, 1000);
var floorm = new THREE.MeshBasicMaterial({color: 'green'});
var floor = new THREE.Mesh(floorg, floorm);
floor.position.set(0, -5, 0)
scene.add(floor);

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
var light3 = new THREE.PointLight( ); 
light.position.set(-1000,1000,1000);
light2.position.set(1000, 1000, -500);
light3.position.set(0, -1000, 500);
scene.add( light );
scene.add( light2 );
scene.add( light3 );

var velocity = 0.1;
var alpha = Math.PI/2, beta = 0;
var cx=1, cy=0 , cz=1, dy=0;
function updateCamera(){   
    camera.position.set(cx, cy, cz);
    camera.lookAt(new THREE.Vector3(Math.cos(alpha)*Math.cos(beta) + cx, Math.sin(beta) + cy, Math.sin(alpha)*Math.cos(beta) + cz));
}
updateCamera();

socket.on('init', function(cid, pl){
    id = cid;
    for (let i=0; i<pl.length; ++i){
        if (i != id){
            p[i] = new Player(pl[i].x, pl[i].y, pl[i].z, pl[i].alpha);
        }else{
            cx = pl[i].x;
            cy = pl[i].y;
            cz = pl[i].z;
            alpha = pl[i].alpha;
        }
    }
})

socket.on('newpl', function(pid, pl){
    p[pid] = new Player(pl.x, pl.y, pl.z, pl.alpha);
});

socket.on('move', function(pid, pl){
    p[pid].move(pl.x, pl.y, pl.z, pl.alpha);
})

var oldalpha = 0;

function update() {
    dy-=0.01;
    oldx = cx;
    oldy = cy;
    oldz = cz;
    cy+=dy;
    if (cy<0) cy=0;
    if (isKeyPressed[87]){
        cx += Math.cos(alpha)*velocity*5;
        cz += Math.sin(alpha)*velocity*5;
    }if (isKeyPressed[83]){
        cx += Math.cos(alpha+Math.PI)*velocity*5;
        cz += Math.sin(alpha+Math.PI)*velocity*5;
    }if (isKeyPressed[65]){
        cx += Math.cos(alpha-Math.PI/2)*velocity*5;
        cz += Math.sin(alpha-Math.PI/2)*velocity*5;
    }if (isKeyPressed[68]){
        cx += Math.cos(alpha+Math.PI/2)*velocity*5;
        cz += Math.sin(alpha+Math.PI/2)*velocity*5;
    }
    if (oldx != cx || oldy != cy || oldz != cz || oldalpha != alpha){
        socket.emit('move', cx, cy, cz, alpha);
    }
    oldalpha = alpha;
    updateCamera();
}

function keyup(key) {
    if (key == 27) document.exitPointerLock();
	if (key == 32 && cy<=0) dy=0.5;
	console.log("Pressed", key);
}
function mouseMove(e){
    //console.log(e.movementX, e.movementY);
    alpha += e.movementX*0.003;
    beta -= e.movementY*0.003;
    if (beta > Math.PI/2-0.001) beta = Math.PI/2-0.001;
    if (beta < -Math.PI/2+0.001) beta = -Math.PI/2+0.001;
}
function mouseup() {
    if (document.pointerLockElement !== canvas){
        canvas.requestPointerLock();
    }
}
