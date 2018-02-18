var player = new RotRect(200, 300, 100, 50, 0, 'blue'), enemy = [];
var bullets = [];

for (let i=0; i<3; ++i){
    enemy[i] = new RotRect(600, 150*(i+1), 100, 50, Math.PI, 'red');
}

function update() {
    if (isKeyPressed[87]){player.moveForward(5);}
    if (isKeyPressed[83]){player.moveBack(5);}
    if (isKeyPressed[65]){player.rotate(-0.05);}
    if (isKeyPressed[68]){player.rotate(0.05);}
    for (let i=0; i<bullets.length; ++i){
        bullets[i].moveForward(10);
    }
}

function draw() {
    player.draw();
    for (let i=0; i<3; ++i){
        enemy[i].draw();
    }
    for (let i=0; i<bullets.length; ++i){
        bullets[i].draw();
    }
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    let angle = Math.atan2(mouseY - player.cy, mouseX - player.cx);
    bullets.push(new RotRect(player.cx, player.cy, 30, 10, angle, 'blue'));
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
