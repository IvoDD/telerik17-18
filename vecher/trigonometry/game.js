var myX, myY;
var alpha = 30;
var radian;
console.log(Math.PI);

function update() {
    alpha++;
    if (alpha > 360){alpha = alpha-360;}
    radian = alpha*Math.PI/180;
    myX = Math.cos(radian)*200 + 400;
    myY = Math.sin(radian)*200 + 300;
}

function draw() {
    // This is how you draw a rectangle
    context.beginPath();
    context.moveTo(400, 300);
    context.lineTo(myX, myY);
    context.stroke();
    context.fillRect(myX, myY, 30, 30);
    context.beginPath();
    context.arc(400, 300, 200, 0, 2*Math.PI);
    context.stroke();
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
