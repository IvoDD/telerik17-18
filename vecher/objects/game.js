var rect = {}, rect2 = {};
rect.x = 100;
rect.y = 100;
rect.sizex = 300;
rect.sizey = 200;
rect.color = 'red';
rect2.x = 100;
rect2.y = 350;
rect2.sizex = 300;
rect2.sizey = 200;
rect2.color = 'blue';

var rects = [rect, rect2]

function drawR(rect1){
    context.fillStyle = rect1.color;
    context.fillRect(rect1.x, rect1.y, rect1.sizex, rect1.sizey);
}

function update() {
}

function draw() {
    drawR(rects[0]);
    drawR(rects[1]);
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
