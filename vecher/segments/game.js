// Creating variables
var x=[], y=[], z=[];

for (let i=0; i<20*8; i+=8){
    x[i+6] = x[i+4] = x[i+2] = x[i] = Math.random()*800-400;
    y[i] = y[i+1] = y[i+2] = y[i+3] = Math.random()*600-300;
    z[i] = z[i+1] = z[i+4] = z[i+5] = Math.random()*5;
    x[i+7] = x[i+5] = x[i+3] = x[i+1] = x[i]+50;
    y[i+7] = y[i+6] = y[i+5] = y[i+4] = y[i]+50;
    z[i+7] = z[i+6] = z[i+3] = z[i+2] = z[i]+0.15;
}

function segment3d(ind1, ind2){
    if (z[ind1]>=0 && z[ind2]>=0){
        context.beginPath();
        context.moveTo(x[ind1]/z[ind1] + 400, y[ind1]/z[ind1] + 300);
        context.lineTo(x[ind2]/z[ind2] + 400, y[ind2]/z[ind2] + 300);
        context.stroke();
    }
}

function drawCube(i){
    segment3d(i, i+1);
    segment3d(i+2, i+3);
    segment3d(i+4, i+5);
    segment3d(i+6, i+7);
    segment3d(i, i+4);
    segment3d(i+1, i+5);
    segment3d(i+2, i+6);
    segment3d(i+3, i+7);
    segment3d(i, i+2);
    segment3d(i+1, i+3);
    segment3d(i+4, i+6);
    segment3d(i+5, i+7);
}

function rotateX(i, d){
    var x1 = x[i];
    var z1 = z[i]*375;
    var angle = Math.atan2(z1, x1);
    angle+=d;
    var dist = Math.sqrt(x1*x1 + z1*z1);
    var x_new = Math.cos(angle)*dist;
    var z_new = Math.sin(angle)*dist;
    x[i] = x_new;
    z[i] = z_new/375;
}

function rotateY(i, d){
    var y1 = y[i];
    var z1 = z[i]*375;
    var angle = Math.atan2(z1, y1);
    angle+=d;
    var dist = Math.sqrt(y1*y1 + z1*z1);
    var y_new = Math.cos(angle)*dist;
    var z_new = Math.sin(angle)*dist;
    y[i] = y_new;
    z[i] = z_new/375;
}

function update() {
    for (let i=0; i<20*8; ++i){
        if (isKeyPressed[key_up]){rotateY(i, -0.01);}
        if (isKeyPressed[key_down]){rotateY(i, 0.01);}
        if (isKeyPressed[65]){x[i]+=5;}
        if (isKeyPressed[68]){x[i]-=5;}
        if (isKeyPressed[87]){z[i]-=0.05;}
        if (isKeyPressed[83]){z[i]+=0.05;}
        if (isKeyPressed[key_left]){rotateX(i, -0.01);}
        if (isKeyPressed[key_right]){rotateX(i, 0.01);}
    }
}

function draw() {
    for (let i=0; i<20*8; i+=8){
        drawCube(i);
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
