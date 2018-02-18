// Creating variables
var bx = 100, by = 500;
var ex = 700, ey = 300;
var myX = bx, myY = by;
var tx, ty;
var bulletX=[], bulletY=[];
var dxb=[], dyb=[];

function dist(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}

var v = 2, vb = 5, s = dist(bx, by, ex, ey);
var dx = (ex-bx)*v/s;
var dy = (ey-by)*v/s;
var t = 0;

function update() {
    ++t;
    myX = bx + t*dx;
    myY = by + t*dy;
    if (t>=s/v){
        t=0;
        myX = bx;
        myY = by;
    }
    for (let i=0; i<bulletX.length; ++i){
        bulletX[i] += dxb[i];
        bulletY[i] += dyb[i];
    }
    if (isKeyPressed[32]){
        let l=0, r=s, m;
        for (let i=0; i<20; ++i){
            m = (l+r)/2;
            let t1 = m/v-t, t2 = dist(tx, ty, bx+(m/v*dx), by+(m/v*dy))/vb;
            if (t1 > t2) r = m;
            else l = m;
        }
        var targetX=bx+l/v*dx, targetY=by+l/v*dy;
        bulletX.push(tx);
        bulletY.push(ty);
        let s2 = dist(tx, ty, targetX, targetY);
        dxb.push((targetX-tx)*vb/s2);
        dyb.push((targetY-ty)*vb/s2);
    }
}

function draw() {
    // This is how you draw a rectangle
    context.beginPath();
    context.moveTo(bx, by);
    context.lineTo(ex, ey);
    context.stroke();
    context.fillStyle = "blue";
    context.fillRect(myX-15, myY-15, 30, 30);
    context.fillStyle = "green";
    for (let i=0; i<bulletX.length; ++i){
        context.fillRect(bulletX[i]-5, bulletY[i]-5, 10, 10)
    }
    context.fillStyle = "red";
    context.fillRect(tx-15, ty-15, 30, 30);
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    tx = mouseX; ty = mouseY;
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
