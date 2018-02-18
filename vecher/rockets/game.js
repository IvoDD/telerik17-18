// Creating variables
var myX = 600, myY = 300;
var rX = [], rY = [];
var rs = 1;

function dist(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
}

function update() {
    myX = mouseX;
    myY = mouseY;
    rX.push(0);
    rY.push(Math.random()*600);
    for (let i=0; i<rX.length; ++i){
        let s = dist(rX[i], rY[i], myX, myY);
        let dx = (myX - rX[i])*rs/s;
        let dy = (myY - rY[i])*rs/s;
        rX[i] += dx;
        rY[i] += dy;
    }
    for (let i=0; i<rX.length; ++i){
        for (let j=i+1; j<rX.length; ++j){
            if (areColliding(rX[i], rY[i], 4, 4, rX[j], rY[j], 4, 4)){
                rX[i] = rX[rX.length-1]
                rY[i] = rY[rY.length-1]
                rX.pop()
                rY.pop();
                rX[j] = rX[rX.length-1]
                rY[j] = rY[rY.length-1]
                rX.pop()
                rY.pop()
            }
        }
    }
}

function draw() {
    // This is how you draw a rectangle
    context.fillStyle = "blue";
    context.fillRect(myX, myY, 30, 30);
    context.fillStyle = "red";
    for (let i=0; i<rX.length; ++i){
        context.fillRect(rX[i], rY[i], 4, 4);
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
