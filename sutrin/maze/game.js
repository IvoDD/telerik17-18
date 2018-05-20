// Creating variables
var canvas = document.getElementsByTagName('canvas')[0];
var wmaterial = new THREE.MeshPhongMaterial();

var floorg = new THREE.BoxGeometry(1000, 1, 1000);
var floorm = new THREE.MeshBasicMaterial({color: 'green'});
var floor = new THREE.Mesh(floorg, floorm);
floor.position.set(0, -5, 0)
scene.add(floor);
var wall = [];
var wall_geometry = new THREE.BoxGeometry(10, 8, 1);

var n=20;
var nw=0;
var green = [];
var cand = [];
var hasWall1 = [], hasWall2 = [];
for (let i=0; i<=n; ++i){
    hasWall1[i] = [];
    for (let j=0; j<n; ++j){
        hasWall1[i][j] = true;
    }
}
for (let i=0; i<n; ++i){
    hasWall2[i] = [];
    for (let j=0; j<=n; ++j){
        hasWall2[i][j] = true;
    }
}
for (let i=0; i<n; ++i){
    green[i] = [];
    for (let j=0; j<n; ++j){
        green[i][j]=false;
    }
}

function addCell(i, j){
    green[i][j]=true;
    cand.push({i: i, j: j, t: 1});
    cand.push({i: i+1, j: j, t: 1});
    cand.push({i: i, j: j, t: 2});
    cand.push({i: i, j: j+1, t: 2});
}

addCell(n/2, n/2);
while (cand.length > 0){
    let ind = Math.floor( Math.random()*cand.length )
    let cw = cand[ind];
    cand[ind] = cand[cand.length-1];
    cand.pop();
    if (cw.t == 1){
        if (cw.i==0 || cw.i==n) continue;
        if (!green[cw.i][cw.j]) {
            addCell(cw.i, cw.j);
            hasWall1[cw.i][cw.j]=false;
        }
        if (!green[cw.i-1][cw.j]) {
            addCell(cw.i-1, cw.j);
            hasWall1[cw.i][cw.j]=false;
        }
    }else{
        if (cw.j==0 || cw.j==n) continue;
        if (!green[cw.i][cw.j]) {
            addCell(cw.i, cw.j);
            hasWall2[cw.i][cw.j]=false;
        }
        if (!green[cw.i][cw.j-1]) {
            addCell(cw.i, cw.j-1);
            hasWall2[cw.i][cw.j]=false;
        }
    }
}
if (Math.random() < 0.5){
    if (Math.random() < 0.5){
        hasWall1[0][Math.floor(Math.random()*n)] = false;
    }else{
        hasWall1[n][Math.floor(Math.random()*n)] = false;
    }
}else{
    if (Math.random() < 0.5){
        hasWall2[Math.floor(Math.random()*n)][0] = false;
    }else{
        hasWall2[Math.floor(Math.random()*n)][n] = false;
    }
}

function addWall(x, z, rot){
    wall[nw] = new THREE.Mesh(wall_geometry, wmaterial);
    wall[nw].position.set(x, 0, z);
    wall[nw].rotation.y = rot;
    scene.add(wall[nw]);
    ++nw;
}

for (let i=0; i<=n; ++i){
    for (let j=0; j<n; ++j){
        if(hasWall1[i][j]) addWall(j*9+4.5, i*9, 0);
    }
}
for (let i=0; i<n; ++i){
    for (let j=0; j<=n; ++j){
        if(hasWall2[i][j]) addWall(j*9, i*9+4.5, Math.PI/2);
    }
}

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
var light3 = new THREE.PointLight( ); 
light.position.set(-1000,1000,1000);
light2.position.set(1000, 1000, -500);
light3.position.set(0, -1000, 500);
scene.add( light );
scene.add( light2 );
scene.add( light3 );

var cx=n/2*9+4, cy=0, cz=n/2*9+4;
var alpha=0, beta=0;
var velocity=0.1;

function updateCamera(){   
    camera.position.set(cx, cy, cz);
    camera.lookAt(new THREE.Vector3(Math.cos(alpha)*Math.cos(beta) + cx, Math.sin(beta) + cy, Math.sin(alpha)*Math.cos(beta) + cz));
}
updateCamera();

function update() {
    oldx = cx;
    oldz = cz;
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
    let collisionx = false;
    let collisionz = false;
    for (let i=0; i<nw; ++i){
        if (wall[i].rotation.y > 0){
            if (areColliding(cx-1, cz-1, 2, 2, wall[i].position.x-0.5, wall[i].position.z-5, 1, 10) && cy<4.3) {
                if (oldx-1 > wall[i].position.x + 0.5 || oldx+1 < wall[i].position.x - 0.5) collisionx = true;
                if (oldz-1 > wall[i].position.z + 5 || oldz+1 < wall[i].position.z - 5) collisionz = true;
            }
        }else{
            if (areColliding(cx-1, cz-1, 2, 2, wall[i].position.x-5, wall[i].position.z-0.5, 10, 1) && cy<4.3){
                if (oldx-1 > wall[i].position.x + 5 || oldx+1 < wall[i].position.x - 5) collisionx = true;
                if (oldz-1 > wall[i].position.z + 0.5 || oldz+1 < wall[i].position.z - 0.5) collisionz = true;
            }
        }
    }
    if (collisionx) cx = oldx;
    if (collisionz) cz = oldz;
    updateCamera();
}

function keyup(key) {
    if (key == 27) document.exitPointerLock();
	if (key == 32) cy = 100-cy;
	console.log("Pressed", key);
}
function mouseMove(e){
    //console.log(e.movementX, e.movementY);
    alpha += e.movementX*0.0015;
    beta -= e.movementY*0.0015;
    if (beta > Math.PI/2-0.001) beta = Math.PI/2-0.001;
    if (beta < -Math.PI/2+0.001) beta = -Math.PI/2+0.001;
}
function mouseup() {
    if (document.pointerLockElement !== canvas){
        canvas.requestPointerLock();
    }
}
