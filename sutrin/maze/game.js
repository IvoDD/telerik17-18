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

var nw=500;

for (let i=0; i<nw; ++i){
    wall[i] = new THREE.Mesh(wall_geometry, wmaterial);
    wall[i].position.set(Math.random()*1000-500, 0, Math.random()*1000-500);
    if (Math.random()>0.5){wall[i].rotation.y = Math.PI/2;}
    scene.add(wall[i]);
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

var cx=0, cy=0, cz=0;
var alpha=0, beta=0;
var velocity=0.3;

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
