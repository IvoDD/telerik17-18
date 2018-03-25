// Creating variables
var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshPhongMaterial();
var cube = new THREE.Mesh( geometry, material );
cube.position.set(1, 0, 0);
scene.add( cube );

camera.position.set(7, 10, 16);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
light.position.set(8,8,16);
light2.position.set(-8, 8, 16);
scene.add( light );
scene.add( light2 );

function update() {
	//cube.rotation.x += 0.015;
	//cube.rotation.y += 0.010;
	//cube.rotation.z += 0.005;
}

function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Pressed", key);
}
function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
