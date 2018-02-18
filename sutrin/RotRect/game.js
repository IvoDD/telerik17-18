// Creating variables
var rect = [];
var color = ['red', 'blue', 'green', 'purple', 'orange'];
for (let i=0; i<20; ++i){
    rect[i] = new RotRect(Math.random()*800, Math.random()*600, Math.random()*100+50, Math.random()*50+50, Math.random()*7, color[Math.floor(Math.random()*5)]);
}

function update() {
    for (let i=0; i<rect.length; ++i){
        rect[i].rotate(Math.random()*0.1);
        rect[i].moveForward(Math.random()*10);
    }
}

function draw() {
    // This is how you draw a rectangle
    for (let i=0; i<rect.length; ++i){
        rect[i].draw();
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
