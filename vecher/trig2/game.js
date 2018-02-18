// Creating variables
var myX = [], myY = [];
var angle = [], dist = [];
var c=[], colors = ['blue', 'red', 'green', 'yellow', 'purple'];

for (let i=0; i<50; ++i){
    angle[i] = Math.random()*360;
    dist[i] = Math.random()*400;
    c[i] = colors[Math.floor(Math.random()*colors.length)];
}

function update() {
    for (let i=0; i<50; ++i){
        if (isKeyPressed[32]){angle[i]+=1;}
        var rad = angle[i]*Math.PI/180;
        myX[i] = Math.cos(rad)*dist[i] + 400;
        myY[i] = Math.sin(rad)*dist[i]/2 + 300;
    }
}

function draw() {
    // This is how you draw a rectangle
    for (let i=0; i<50; ++i){
        context.beginPath();
        context.moveTo(400, 300);
        context.lineTo(myX[i], myY[i]);
        context.stroke();
        context.fillStyle = c[i];
        context.fillRect(myX[i]-15, myY[i]-15, 30, 30);
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
