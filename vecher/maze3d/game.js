// Creating variables
var canvas = document.getElementsByTagName("canvas")[0];
var geometry = [new THREE.BoxGeometry( 10, 6, 1 ), new THREE.BoxGeometry( 1, 6, 10 )];
var material = new THREE.MeshPhongMaterial();

var nw = 0;
var wall = [], t = [];

function addWall(type, x, z){
    t[nw] = type;
    wall[nw] = new THREE.Mesh(geometry[type], material);
    wall[nw].position.set(x, 0, z);
    scene.add(wall[nw]);
    ++nw;
}

for (let x=-225; x<=225; x+=9){
    for (let z=-225; z<=225; z+=9){
        if (x<225) addWall(0, x, z-4.5);
        if (z<225) addWall(1, x-4.5, z);
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

var cx = 0, cy = 0, cz = 0;
var alpha=-Math.PI/2, beta=0;
updateCamera();
function updateCamera(){
    camera.position.set(cx, cy, cz);
    camera.lookAt(new THREE.Vector3(Math.cos(beta)*Math.cos(alpha) + cx, Math.sin(beta) + cy, Math.cos(beta)*Math.sin(alpha) + cz));
}
var vel = 0.5;
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
    alpha += mx/300;
    beta -= my/300;
    if (beta >= Math.PI/2) beta = Math.PI/2;
    if (beta <= -Math.PI/2) beta = -Math.PI/2;
}
