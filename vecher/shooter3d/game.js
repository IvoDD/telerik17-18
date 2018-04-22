// Creating variables
var canvas = document.getElementsByTagName("canvas")[0];
var geometry = [new THREE.BoxGeometry( 10, 6, 1 ), new THREE.BoxGeometry( 1, 6, 10 )];
var material = new THREE.MeshPhongMaterial();

var nw = 200;
var wall = [], t = [];
for (let i=0; i<nw; ++i){
    t[i] = Math.floor(Math.random()*2)
    wall[i] = new THREE.Mesh( geometry[t[i]], material );
    wall[i].position.set(Math.random()*500-250, 0, Math.random()*500-250);
    scene.add(wall[i]);
}

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
light.position.set(2000, 200, 2000);
light2.position.set(-1000, 200, -2000);
scene.add( light );
scene.add( light2 );

var cx = 0, cy = 0, cz = 0, dy=0;
var alpha=-Math.PI/2, beta=0;
updateCamera();
function updateCamera(){
    camera.position.set(cx, cy, cz);
    camera.lookAt(new THREE.Vector3(Math.cos(beta)*Math.cos(alpha) + cx, Math.sin(beta) + cy, Math.cos(beta)*Math.sin(alpha) + cz));
}
var vel = 0.5;
var onwall;
function update() {
    let oldy = cy;
    cy += dy;
    dy -= 0.01;
    let oldx = cx;
    let oldz = cz;
    if (cy<0) {cy=0;}
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
    onwall = false;
    for (let i=0; i<nw; ++i){
        if (t[i] == 0){
            if(areColliding(cx-1, cz-1, 2, 2, wall[i].position.x-5, wall[i].position.z-0.5, 10, 1) && cy <= wall[i].position.y+4){
                cx = oldx;
                cy = oldy;
                dy = 0;
                cz = oldz;
                onwall = true;
                break;
            }
        }else{
            if(areColliding(cx-1, cz-1, 2, 2, wall[i].position.x-0.5, wall[i].position.z-5, 1, 10) && cy <= wall[i].position.y+4){
                cx = oldx;
                cy = oldy;
                dy = 0;
                cz = oldz;
                onwall = true;
                break;
            }
        }
    }
    updateCamera();
}

function keyup(key) {
	// Show the pressed keycode in the console
    if (key == 27){
        document.exitPointerLock();
    }
    if ((cy==0 || onwall) && key == 32){
        dy = 0.5;
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
