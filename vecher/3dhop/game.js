// Creating variables
var cx = 400, cy = 300;
var myX = [], myY = [], myZ = [];
var ballX = 0, ballY = 0, dy = 0;
var gameover = false;

for (let i=0; i<20; ++i){
    myX[i] = Math.floor(Math.random()*5)*100-250;
    myY[i] = 200;
    myZ[i] = 1 + 0.5*i;
}

function drawFlatRect(x, y, z, sx, sz){
    let x1 = [], y1 = [];
    x1[0] = x/z + cx;
    y1[0] = y/z + cy;
    x1[1] = (x + sx)/z + cx;
    y1[1] = y/z + cy;
    x1[2] = (x + sx)/(z+sz) + cx;
    y1[2] = y/(z+sz) + cy;
    x1[3] = x/(z+sz) + cx;
    y1[3] = y/(z+sz) + cy;

    context.beginPath();
    context.moveTo(x1[0], y1[0]);
    context.lineTo(x1[1], y1[1]);
    context.lineTo(x1[2], y1[2]);
    context.lineTo(x1[3], y1[3]);
    context.fill();
}

function update() {
    if (gameover){return;}
    for (let i=0; i<20; ++i){
        myZ[i] -= 0.01;
        if (myZ[i]<=0){
            myX[i] = Math.floor(Math.random()*5)*100-250;
            myZ[i]=10;
        }
    }
    ballX = mouseX - cx;
    dy += 0.1;
    ballY += dy;
    if (ballY >= 200){
        let flag = false;
        for (let i=0; i<20; ++i){
            if (myZ[i]>=0.4 && myZ[i]<=1.1){
                if (myX[i]<=ballX+30 && myX[i]+100>=ballX){
                    flag = true;
                }
            }
        }
        if (flag){
            dy = -5;
        }else{
            gameover = true;
        }
    }
}

function draw() {
    context.fillStyle = 'blue';
    for (let i=0; i<20; ++i){
        drawFlatRect(myX[i], myY[i], myZ[i], 100, 0.5);
    }
    context.fillStyle = 'red';
    context.fillRect(ballX+cx, ballY+cy, 30, 30);
};

function keyup(key) {
    // Show the pressed keycode in the console
    
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
