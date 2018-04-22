// Creating variables
var canvas = document.getElementsByTagName("canvas")[0];
var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshPhongMaterial();
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
light.position.set(2,2,3);
light2.position.set(-2, -2, 3);
scene.add( light );
scene.add( light2 );

var cx = 0, cy = 0, cz = 16;
var alpha=0, beta=0;
function updateCamera(){
    camera.position.set(cx, cy, cz);
    camera.lookAt(new THREE.Vector3(Math.cos(beta)*Math.cos(alpha) + cx, Math.sin(beta) + cy, Math.cos(beta)*Math.sin(alpha) + cz));
}

function update() {
	cube.rotation.x += 0.015;
	cube.rotation.y += 0.010;
	cube.rotation.z += 0.005;
}

function keyup(key) {
	// Show the pressed keycode in the console
    if (key == 27){
        document.exitPointerLock();
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
    beta += my/300;
    updateCamera();
}
