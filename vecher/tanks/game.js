class Tank{
    constructor(x_, y_, color_){
        this.x = x_;
        this.y = y_;
        this.color = color_;
    }
    moveLeft(){
        this.x -= 10;
    }
    draw(){
        context.beginPath();
        context.arc(this.x, this.y, 20, 0, Math.PI*2);
        context.fillStyle = this.color;
        context.fill();
    }
};

class Parallelogram{
    constructor(x_, y_, len_, wid_, ang_, color_){
        this.x = x_;
        this.y = y_;
        this.len = len_;
        this.wid = wid_;
        this.ang = ang_;
        this.color = color_;
    }
    draw(){
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x+this.len, this.y);
        context.lineTo(this.x+this.len + Math.cos(this.ang)*this.wid, this.y + Math.sin(this.ang)*this.wid);
        context.lineTo(this.x + Math.cos(this.ang)*this.wid, this.y + Math.sin(this.ang)*this.wid);
        context.fillStyle = this.color;
        context.fill();
    }
}

var colors = ['blue', 'red', 'green', 'yellow', 'pink'];
var tanks = [];
tanks[0] = new Tank(100, 200, 'red');
for (let i=1; i<10; ++i){
    tanks[i] = new Parallelogram(Math.random()*800, Math.random()*600, Math.random()*100+50, Math.random()*100+50, Math.random()*Math.PI, colors[Math.floor(Math.random()*5)])
}
function update() {
    
}

function draw() {
    for (let i=0; i<10; ++i){
        tanks[i].draw();
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
