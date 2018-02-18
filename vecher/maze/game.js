var colors = ['blue', 'red'];

var grid = [];
var heroX = 2, posX = 225;
var whereInGrid = 900, offsetY = 0;
var gameover = false;

for (let i=0; i<1000; ++i){
    grid[i] = [];
    for (let j=0; j<5; ++j){
        if (Math.random()<0.2){grid[i][j] = colors[1];}
        else{grid[i][j] = colors[0]}
    }
}

var cx = 400, cy = 300;
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
    if (posX < heroX*100 + 25){
        posX += 5;
    }
    if (posX > heroX*100 + 25){
        posX -= 5;
    }
    if (offsetY > 0){offsetY -= 0.02;}
    if (offsetY < 0){offsetY += 0.02;}
    //posX z=1
    if (grid[whereInGrid+13][heroX] == 'red' && areColliding(heroX*100, 2*0.4, 100, 0.39, posX, 1, 50, 0.1)){
        gameover = true;
    }
}

function draw() {
    for (let i=0; i<15; ++i){
        for (let j=0; j<5; ++j){
            context.fillStyle = grid[whereInGrid + i][j];
            drawFlatRect(j*100-250, 200, (15-i)*0.4+offsetY, 99, 0.39);
        }
    }
    context.fillStyle = 'green';
    context.fillRect(posX + 150, 450 , 50, 50);
    // This is how you draw a rectangle
};

function keyup(key) {
    if (gameover){return;}
    //if (posX != 100*heroX+25 || offsetY!=0){return;}
    // Show the pressed keycode in the console
    if (key == key_left){--heroX;}
    if (key == key_right){++heroX;}
    if (key == key_up){--whereInGrid; offsetY=0.4;}
    if (key == key_down){++whereInGrid; offsetY=-0.4;}
    if (heroX < 0){heroX = 0;}
    if (heroX > 4){heroX = 4;}
    if (whereInGrid > 993){whereInGrid = 993; offsetY = 0;}
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
