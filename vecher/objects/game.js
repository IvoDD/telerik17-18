var rects = [];
var color = ['red', 'green', 'blue', 'yellow', 'purple']

for (var i=0; i<10; ++i){
    rects[i] = {};
    rects[i].x = Math.random()*800;
    rects[i].y = Math.random()*600;
    rects[i].sizex = Math.random()*100;
    rects[i].sizey = Math.random()*100;
    rects[i].color = color[Math.floor(Math.random()*5)];
}

function drawR(rect1){
    context.fillStyle = rect1.color;
    context.fillRect(rect1.x, rect1.y, rect1.sizex, rect1.sizey);
}

function update() {
}

function draw() {
    for (let i=0; i<10; ++i){
        drawR(rects[i]);
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
