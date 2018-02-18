var cx = 400, cy = 300;

function segment3d(x1, y1, z1, x2, y2, z2){
    context.beginPath();
    context.moveTo(x1/z1 + cx, y1/z1 + cy);
    context.lineTo(x2/z2 + cx, y2/z2 + cy);
    context.stroke();
}

function drawCube(x, y, z, sx, sy, sz){
    context.strokeRect(x/z + cx, y/z + cy, sx/z, sy/z);
    context.strokeRect(x/(z+sz) + cx, y/(z+sz) + cy, sx/(z+sz), sy/(z+sz));
    segment3d(x, y, z, x, y, z+sz);
    segment3d(x+sx, y, z, x+sx, y, z+sz);
    segment3d(x, y+sy, z, x, y+sy, z+sz);
    segment3d(x+sx, y+sy, z, x+sx, y+sy, z+sz);
}

var myX = [], myY = [], myZ = [];

for (let i=0; i<10; ++i){
    myX[i] = Math.random()*800-cx;
    myY[i] = Math.random()*600-cy;
    myZ[i] = 0.5 + Math.random()*2;
}

function update() {
    if (isKeyPressed[65]){
        for (let i=0; i<10; ++i){
            myX[i] += 5;
        }
    }if (isKeyPressed[68]){
        for (let i=0; i<10; ++i){
            myX[i] -= 5;
        }
    }if (isKeyPressed[87]){
        for (let i=0; i<10; ++i){
            myZ[i] -= 0.03;
        }
    }if (isKeyPressed[83]){
        for (let i=0; i<10; ++i){
            myZ[i] += 0.03;
        }
    }
}

function draw() {
    for (let i=0; i<10; ++i){
        if (myZ[i] > 0){
            drawCube(myX[i], myY[i], myZ[i], 30, 30, 0.1);
        }
    }
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
