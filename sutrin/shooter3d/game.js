// Creating variables
var canvas = document.getElementsByTagName('canvas')[0];
var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshPhongMaterial({color: 'red'});
var wmaterial = new THREE.MeshPhongMaterial();
var bgeometry = new THREE.SphereGeometry(0.3, 10, 10);
var bmaterial = new THREE.MeshPhongMaterial({color: 'blue'});

var floorg = new THREE.BoxGeometry(1000, 1, 1000);
var floorm = new THREE.MeshBasicMaterial({color: 'green'});
var floor = new THREE.Mesh(floorg, floorm);
floor.position.set(0, -5, 0)
scene.add(floor);

let bvel = 2;
var nw = 500;
var wall = [];
var bullet = [], dx = [], dy2 = [], dz = [];
var wall_geometry = new THREE.BoxGeometry(10, 8, 1);
for (let i=0; i<500; ++i){
    wall[i] = new THREE.Mesh(wall_geometry, wmaterial);
    wall[i].position.set(Math.random()*1000-500, 0, Math.random()*1000-500);
    if (Math.random()>0.5){wall[i].rotation.y = Math.PI/2;}
    scene.add(wall[i]);
}

var ne = 50;
var enemy = [], er = [], ang = [];
for (let i=0; i<ne; ++i){
    enemy[i] = new THREE.Mesh(geometry, material);
    enemy[i].position.set(Math.random()*1000-500, 0, Math.random()*1000-500);
    ang[i] = Math.random()*2*Math.PI;
    scene.add(enemy[i]);
    er[i] = 0;
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

var velocity = 0.1;
var alpha = Math.PI/2, beta = 0;
var cx=1, cy=0 , cz=1, dy=0;
function updateCamera(){   
    camera.position.set(cx, cy, cz);
    camera.lookAt(new THREE.Vector3(Math.cos(alpha)*Math.cos(beta) + cx, Math.sin(beta) + cy, Math.sin(alpha)*Math.cos(beta) + cz));
}
updateCamera();

function update() {
    dy-=0.01;
    oldx = cx;
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
    let collisionx = false;
    let collisionz = false;
    for (let i=0; i<nw; ++i){
        if (wall[i].rotation.y > 0){
            if (areColliding(cx-0.3, cz-0.3, 0.6, 0.6, wall[i].position.x-0.5, wall[i].position.z-5, 1, 10) && cy<4.3) {
                if (oldx-1 > wall[i].position.x + 0.5 || oldx+1 < wall[i].position.x - 0.5) collisionx = true;
                if (oldz-1 > wall[i].position.z + 5 || oldz+1 < wall[i].position.z - 5) collisionz = true;
            }
        }else{
            if (areColliding(cx-0.3, cz-0.3, 0.6, 0.6, wall[i].position.x-5, wall[i].position.z-0.5, 10, 1) && cy<4.3){
                if (oldx-1 > wall[i].position.x + 5 || oldx+1 < wall[i].position.x - 5) collisionx = true;
                if (oldz-1 > wall[i].position.z + 0.5 || oldz+1 < wall[i].position.z - 0.5) collisionz = true;
            }
        }
    }
    if (collisionx) cx = oldx;
    if (collisionz) cz = oldz;
    updateCamera();
    for (let i=0; i<ne; ++i){
        if (Math.random()<0.03){
            er[i] = Math.random()*0.1-0.05;
        }
        ang[i] += er[i];
        enemy[i].rotation.y = -ang[i];
        //if (i) console.log(enemy[i].rotation.y);
        enemy[i].position.set(enemy[i].position.x + Math.cos(ang[i])*velocity, enemy[i].position.y, enemy[i].position.z + Math.sin(ang[i])*velocity)
    }
    for (let i=0; i<bullet.length; ++i){
        bullet[i].position.x += dx[i];
        bullet[i].position.y += dy2[i];
        bullet[i].position.z += dz[i];
        let bcol = false;
        for (let j=0; j<nw; ++j){
            if (wall[j].rotation.y > 0){
                if (areColliding(bullet[i].position.x-1, bullet[i].position.z-1, 2, 2, wall[j].position.x-0.5, wall[j].position.z-5, 1, 10) && bullet[i].position.y<5) {
                    bcol = true;
                    break;
                }
            }else{
                if (areColliding(bullet[i].position.x-1, bullet[i].position.z-1, 2, 2, wall[j].position.x-5, wall[j].position.z-0.5, 10, 1) && bullet[i].position.y<5){
                    bcol = true;
                    break;
                }
            }
        }
        if (bcol || cy<-5){
            scene.remove(bullet[i]);
            bullet[i] = bullet[bullet.length-1];
            dx[i] = dx[bullet.length-1];
            dy2[i] = dy2[bullet.length-1];
            dz[i] = dz[bullet.length-1];
            bullet.pop();
            dx.pop();
            dy2.pop();
            dz.pop();
        }
    }
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
    bullet.push(new THREE.Mesh(bgeometry, bmaterial));
    bullet[bullet.length-1].position.set(cx, cy, cz);
    scene.add(bullet[bullet.length-1]);
    
    dx.push(Math.cos(alpha)*Math.cos(beta)*bvel);
    dy2.push(Math.sin(beta)*bvel);
    dz.push(Math.sin(alpha)*Math.cos(beta)*bvel);
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
