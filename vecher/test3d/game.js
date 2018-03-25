// Creating variables
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshPhongMaterial();

var cube = []
for (let i=0; i<10; ++i){
    cube[i] = [];
    for (let j=0; j<10; ++j){
        cube[i][j] = new THREE.Mesh( geometry, material );
        cube[i][j].position.set(i*1.1-5, j*1.1-5, 0);
        scene.add( cube[i][j] );
    }
}

camera.position.set(7, 10, 25);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
light.position.set(20,20,20);
light2.position.set(-20, -20, 20);
scene.add( light );
scene.add( light2 );
var t = 0;
function update() {
    t+=0.05;
	for (let i=0; i<10; ++i){
        for (let j=0; j<10; ++j){
            cube[i][j].position.z = Math.sin(t - (i+j)*0.5)*2;
        }
    }
}

function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Pressed", key);
}
function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
