// Creating variables
var canvas = document.getElementsByTagName("canvas")[0];
var geometry = [new THREE.BoxGeometry( 10, 6, 1 ), new THREE.BoxGeometry( 1, 6, 10 )];
var material = new THREE.MeshPhongMaterial();

var n=20;
var haswall0 = [], haswall1 = [];
var used=[];
var cand = [];

for (let i=0; i<n; ++i){
    used[i]=[];
    for (let j=0; j<n; ++j){
        used[i][j]=false;
    }
}

for (let i=0; i<n; ++i){
    haswall0[i] = []
    for (let j=0; j<=n; ++j) haswall0[i][j] = true;
}
for (let i=0; i<=n; ++i){
    haswall1[i] = []
    for (let j=0; j<n; ++j) haswall1[i][j] = true;
}

function addUsed(i, j){
    used[i][j] = true;
    cand.push({t: 0, i: i, j: j});
    cand.push({t: 0, i: i, j: j+1});
    cand.push({t: 1, i: i, j: j});
    cand.push({t: 1, i: i+1, j: j});
}
addUsed(n/2, n/2);
while (cand.length > 0){
    let ind = Math.floor(Math.random()*cand.length);
    let c = cand[ind];
    cand[ind] = cand[cand.length-1];
    cand.pop();
    if (c.t == 0 && c.j > 0 && c.j<n){
        if (!used[c.i][c.j]){addUsed(c.i, c.j); haswall0[c.i][c.j]=false;}
        if (!used[c.i][c.j-1]){addUsed(c.i, c.j-1); haswall0[c.i][c.j]=false;}
    }
    if (c.t == 1 && c.i > 0 && c.i<n){
        if (!used[c.i][c.j]) {addUsed(c.i, c.j); haswall1[c.i][c.j]=false;}
        if (!used[c.i-1][c.j]) {addUsed(c.i-1, c.j); haswall1[c.i][c.j]=false;}
    }
}

let ind = Math.floor(Math.random()*n);
if (Math.random() < 0.5){
    if (Math.random() < 0.5){
        haswall0[ind][0] = false;
    }else{
        haswall0[ind][n] = false;
    }
}else{
    if (Math.random() < 0.5){
        haswall1[0][ind] = false;
    }else{
        haswall1[n][ind] = false;
    }
}

var nw = 0;
var wall = [], t = [];

function addWall(type, x, z){
    t[nw] = type;
    wall[nw] = new THREE.Mesh(geometry[type], material);
    wall[nw].position.set(x, 0, z);
    scene.add(wall[nw]);
    ++nw;
}

for (let i=0; i<n; ++i){
    for (let j=0; j<=n; ++j){
        if (haswall0[i][j]) addWall(0, 9*i, 9*j-4.5);
    }
}
for (let i=0; i<=n; ++i){
    for (let j=0; j<n; ++j){
        if (haswall1[i][j]) addWall(1, 9*i-4.5, 9*j);
    }
}

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
var light3 = new THREE.PointLight( );
light.position.set(2000, 200, 2000);
light2.position.set(-1000, 200, -2000);
light3.position.set(0, 200, 0);
scene.add( light );
scene.add( light2 );
scene.add( light3 );

var cx = 9*n/2, cy = 0, cz = 9*n/2;
var alpha=-Math.PI/2, beta=0;
updateCamera();
function updateCamera(){
    camera.position.set(cx, cy, cz);
    camera.lookAt(new THREE.Vector3(Math.cos(beta)*Math.cos(alpha) + cx, Math.sin(beta) + cy, Math.cos(beta)*Math.sin(alpha) + cz));
}
var vel = 0.2;
function update() {
    let oldx = cx;
    let oldz = cz;
    if (isKeyPressed[87]){
        cx += Math.cos(alpha)*vel;
        cz += Math.sin(alpha)*vel;
    }
    if (isKeyPressed[83]){
        cx -= Math.cos(alpha)*vel;
        cz -= Math.sin(alpha)*vel;
    }
    if (isKeyPressed[68]){
        cx += Math.cos(alpha+Math.PI/2)*vel;
        cz += Math.sin(alpha+Math.PI/2)*vel;
    }
    if (isKeyPressed[65]){
        cx += Math.cos(alpha-Math.PI/2)*vel;
        cz += Math.sin(alpha-Math.PI/2)*vel;
    }
    let colx = false, colz = false;
    for (let i=0; i<nw; ++i){
        if (t[i] == 0){
            if(areColliding(cx-1, cz-1, 2, 2, wall[i].position.x-5, wall[i].position.z-0.5, 10, 1) && cy <= wall[i].position.y+4){
                if (oldx-1 > wall[i].position.x+5 || oldx+1 < wall[i].position.x-5) colx=true;
                if (oldz-1 > wall[i].position.z+0.5 || oldz+1 < wall[i].position.z-0.5) colz=true;
            }
        }else{
            if(areColliding(cx-1, cz-1, 2, 2, wall[i].position.x-0.5, wall[i].position.z-5, 1, 10) && cy <= wall[i].position.y+4){
                if (oldx-1 > wall[i].position.x+0.5 || oldx+1 < wall[i].position.x-0.5) colx=true;
                if (oldz-1 > wall[i].position.z+5 || oldz+1 < wall[i].position.z-5) colz=true;
            }
        }
    }
    if (colx) cx = oldx;
    if (colz) cz = oldz;
    updateCamera();
}

function keyup(key) {
	// Show the pressed keycode in the console
    if (key == 27){
        document.exitPointerLock();
    }
    if (key==32){
        cy = 150-cy;
    }
	console.log("Pressed", key);
}
function mouseup() {
    if (document.pointerLockElement !== canvas){
        canvas.requestPointerLock();
    }
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
function mouseMove(mx, my){
    alpha += mx/700;
    beta -= my/700;
    if (beta >= Math.PI/2) beta = Math.PI/2;
    if (beta <= -Math.PI/2) beta = -Math.PI/2;
}
