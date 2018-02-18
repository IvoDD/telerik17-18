// Creating variables
var myX = [], myY = [], r = [], da = [];
var alpha = [];
for (let i=0; i<10; ++i){
    alpha[i] = 0;
    r[i] = Math.random()*80;
    da[i] = Math.random()*8 - 4;
}
function update() {
    for (let i=0; i<10; ++i){
        alpha[i] += da[i];
        let rad = alpha[i]*Math.PI/180;
        myX[i] = Math.cos(rad)*r[i];
        myY[i] = Math.sin(rad)*r[i];
    }
}

function draw() {
    context.beginPath();
    context.moveTo(400, 300);
    let x = 400, y = 300;
    for (let i=0; i<10; ++i){
        x += myX[i]; y += myY[i];
        context.lineTo(x, y);
    }
    context.stroke();
    // This is how you draw a rectangle
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
